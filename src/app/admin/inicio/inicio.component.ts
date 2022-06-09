import { Component, OnInit } from '@angular/core';
import { AccesibilidadService } from 'src/app/shared/accesibilidad.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  band:Boolean=false;
  constructor(public accesibilidad:AccesibilidadService) { }

  ngOnInit(): void {
  }
  click(){
    this.band==false?this.band=true:this.band=false;
  }
}
