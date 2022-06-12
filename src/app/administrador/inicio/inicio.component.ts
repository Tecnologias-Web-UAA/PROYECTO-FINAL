import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccesibilidadService } from 'src/app/shared/accesibilidad.service';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  band:Boolean=false;
  user!:any;
  constructor(public accesibilidad:AccesibilidadService,private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
   this.getEmail();
   this.router.navigate(['/altas']);
  }
  click(){
    this.band==false?this.band=true:this.band=false;
  }
  logOut(){
    this.auth.signOut();
  }
  getEmail(){
    this.auth.getUserLogged().subscribe(res=>{
      this.user = res?.email;
    }); 
  }
}
