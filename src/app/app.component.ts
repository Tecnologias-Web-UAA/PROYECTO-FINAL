import { Component } from '@angular/core';
import { AccesibilidadService } from './shared/accesibilidad.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TiendaElectronica';
  constructor(public accesibilidad:AccesibilidadService){}
}
