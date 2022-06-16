import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccesibilidadService } from 'src/app/shared/accesibilidad.service';
import { AuthService } from 'src/app/shared/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  band:Boolean=false;
  user!:any;
  paises!:any[];
  posiciones:any[]=[];
  constructor(public accesibilidad:AccesibilidadService,private auth:AuthService,private router:Router,
    private hhtpclient:HttpClient) { 
      this.hhtpclient.get('https://restcountries.com/v2/lang/es').subscribe((res:any)=>{
        this.paises = res;
      });
    }

  ngOnInit(): void {
   this.getEmail();
  //  this.router.navigate(['/altas']);
  console.log(Math.floor( Math.random() * (10 - 1) + 1));
  let num:number;  
  let index:number;
  let i = 0;
  while( i < 5 ){
      num = Math.floor( Math.random() * (23 - 0) + 0);
      index = this.posiciones.findIndex(p=>p===num);
      
      if(index==-1){
        this.posiciones.push(num);
        i++;
      }
    }
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
