import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import ResistenciasComponent from './formulario/resistencias/resistencias.component';
import { TemapComponent } from './tem/temap/temap.component';
import { TemahComponent } from './tem/temah/temah.component';
import { ListMessageComponent } from './tem/list-message/list-message.component';
import { AddMessageComponent } from './tem/add-message/add-message.component';
// import { Ejemplo1Component } from "./formulario/ejemplo1/ejemplo1.component";

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet, Ejemplo1Component],
  imports: [RouterOutlet, ResistenciasComponent, TemapComponent, TemahComponent, ListMessageComponent, AddMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
