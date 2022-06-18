import { Component, Input, OnInit } from '@angular/core';
import { AccesibilidadService } from 'src/app/shared/accesibilidad.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {
  @Input() band:Boolean=false;
  user:string='hola';
  constructor(public accesibilidad:AccesibilidadService) { }

  ngOnInit(): void {
  }
  click(){
    this.band==false?this.band=true:this.band=false;
  }
  logOut(){

  }
}
