import { Component, OnInit } from '@angular/core';
import { MessageserviceService } from '../messageservice.service';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-message',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-message.component.html',
  styles: ``
})
export class AddMessageComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private readonly fb:FormBuilder, public messageService: MessageserviceService) { }
  alumnos:string="";

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm():FormGroup{
    return this.fb.group({
      nombre:[''],
    })
  }

  addAlumno(){
    let {nombre} = this.formGroup.value;
    this.messageService.add(nombre);
    this.formGroup.get('nombre')?.setValue('')
  }

  // constructor(public messageService: MessageserviceService) { }
  // alumno:string="";

  // addAlumno(){
  //   this.messageService.add(this.alumno);
  //   this.alumno=""
  // }
}
