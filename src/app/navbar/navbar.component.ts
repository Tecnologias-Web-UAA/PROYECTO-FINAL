import { Component, OnInit } from '@angular/core';
import { AccesibilidadService } from '../shared/accesibilidad.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private accesibilidad:AccesibilidadService) { 
    if(this.accesibilidad.band==false)
    this.accesibilidad.changeBand();
  }

  ngOnInit(): void {
  }

}
