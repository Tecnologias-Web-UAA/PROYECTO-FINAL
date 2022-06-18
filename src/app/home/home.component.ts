import { Component, OnInit } from '@angular/core';
import { productos } from '../productos';
import { AccesibilidadService } from '../shared/accesibilidad.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  misProd:any[]=productos;
  constructor(public accesibilidad:AccesibilidadService) { }

  ngOnInit(): void {
  }

}
