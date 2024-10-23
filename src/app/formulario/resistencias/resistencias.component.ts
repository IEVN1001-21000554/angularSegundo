import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
interface Resistencias {
  color1: string;
  color2: string;
  color3: string;
  tolerancia: string;
  // valor: number;
  // valorMaximo: number;
  // valorMinimo: number;
}
 
@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resistencias.component.html',
  styles: ``
})
export default class ResistenciasComponent implements OnInit {

  resistenciasForm!: FormGroup;
  resistencias: Resistencias[] = [];
  mostrarValores = false;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.resistenciasForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      color1: [''],
      color2: [''],
      color3: [''],
      tolerancia: ['']
    });
  }

  onSubmit(): void {
    const { color1, color2, color3, tolerancia } = this.resistenciasForm.value;
    const valor = this.calcularValor(color1, color2, color3);
    const { valorMaximo, valorMinimo } = this.calcularTolerancia(valor, tolerancia);

    const nuevaResistencia: Resistencias = {
      color1,
      color2,
      color3,
      tolerancia,
        // valor,
        // valorMaximo,
        // valorMinimo
    };

    this.resistencias.push(nuevaResistencia);
    localStorage.setItem('resistencias', JSON.stringify(this.resistencias));
  }

  calcularValor(color1: string, color2: string, color3: string): number {
    const colores = ['Negro', 'Café', 'Rojo', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Morado', 'Gris', 'Blanco'];
    const multiplicadores = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];
  
    const valor1 = colores.indexOf(color1);
    const valor2 = colores.indexOf(color2);
    const valor3 = colores.indexOf(color3);

    const valorResistencia = (valor1 * 10 + valor2) * multiplicadores[valor3];
  
    return valorResistencia;
  }

  calcularTolerancia(valor: number, tolerancia: string): { valorMaximo: number, valorMinimo: number } {
    let ValorTolerancia = tolerancia === 'oro' ? 0.05 : 0.10;
    const valorMaximo = valor + (valor * ValorTolerancia);
    const valorMinimo = valor - (valor * ValorTolerancia);
    return { valorMaximo, valorMinimo };
  }

  subImprime(): void {
    this.mostrarValores = true;
    const resistenciasGuardadas = localStorage.getItem('resistencias');
    if (resistenciasGuardadas) {
      this.resistencias = JSON.parse(resistenciasGuardadas);
    }
  }

  ocultarValores(): void {
    this.mostrarValores = false;
  }


  getColor(color: string): string {
    const colores: { [key: string]: string } = {
      Negro: 'black',
      Café: 'brown',
      Rojo: 'red',
      Naranja: 'orange',
      Amarillo: 'yellow',
      Verde: 'green',
      Azul: 'blue',
      Morado: 'violet',
      Gris: 'gray',
      Blanco: 'white'
    };
    return colores[color] || 'transparent';
  }

  getToleranciaColor(tolerancia: string): string {
    return tolerancia === 'oro' ? 'gold' : 'silver';
  }
}

