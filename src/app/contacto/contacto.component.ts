import { Component, OnInit } from '@angular/core';
import { AccesibilidadService } from '../shared/accesibilidad.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  
  constructor(public accesibilidad:AccesibilidadService) { }

  ngOnInit(): void {
  }

}
