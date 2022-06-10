import { Component } from '@angular/core';
import { AccesibilidadService } from './shared/accesibilidad.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TiendaElectronica';
  band:Boolean=true;
  constructor(public accesibilidad:AccesibilidadService){
   
  }
 
}
