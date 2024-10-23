import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Empleado {
  matricula: string;
  nombre: string;
  correo: string;
  edad: number;
  horas: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styles: [``]
})
export default class EmpleadosComponent implements OnInit {
  empleadoForm!: FormGroup;
  empleados: Empleado[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      matricula: [''],
      nombre: [''],
      correo: [''],
      edad: [''],
      horas: ['']
    });
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }

  guardarEmpleados(): void {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  onSubmit(): void {
    const nuevoEmpleado: Empleado = this.empleadoForm.value;
    this.empleados.push(nuevoEmpleado);
    this.guardarEmpleados();
    this.empleadoForm.reset();
  }

  buscarEmpleado(): void {
    const matricula = this.empleadoForm.get('matricula')?.value;
    const empleado = this.empleados.find(e => e.matricula === matricula);
    if (empleado) {
      this.empleadoForm.setValue(empleado);
    }
  }

  modificarEmpleado(): void {
    const matricula = this.empleadoForm.get('matricula')?.value;
    const index = this.empleados.findIndex(e => e.matricula === matricula);
    if (index !== -1) {
      this.empleados[index] = this.empleadoForm.value;
      this.guardarEmpleados();
      this.empleadoForm.reset();
    }
  }

  eliminarEmpleado(): void {
    const matricula = this.empleadoForm.get('matricula')?.value;
    this.empleados = this.empleados.filter(e => e.matricula !== matricula);
    this.guardarEmpleados();
    this.empleadoForm.reset();
  }

  calcularPagoNormal(horas: number): number {
    const tarifaNormal = 70;
    let horasNormales = horas;
    if (horas > 40) {
      horasNormales = 40;
    }
    return horasNormales * tarifaNormal;
  }

  calcularPagoExtra(horas: number): number {
    const tarifaExtra = 140;
    let horasExtras = 0;
    if (horas > 40) {
      horasExtras = horas - 40;
    }
    return horasExtras * tarifaExtra;
  }

  calcularPagoTotal(horas: number): number {
    return this.calcularPagoNormal(horas) + this.calcularPagoExtra(horas);
  }

  calcularTotalPagar(): number {
    return this.empleados.reduce((total, empleado) => total + this.calcularPagoTotal(empleado.horas), 0);
  }
}
