import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccesibilidadService } from 'src/app/shared/accesibilidad.service';
import { AuthService } from 'src/app/shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { PeticionesService } from 'src/app/shared/peticiones.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  band:Boolean=false;
  user!:any;
  paises:any[]=[
    {
      name:'ddd',
      flag:'aaa'
    
    }
    
  ];
  posiciones:any[]=[];
  constructor(public accesibilidad:AccesibilidadService,private auth:AuthService,private router:Router,
    private hhtpclient:HttpClient,private peticiones:PeticionesService) { 
      swal.fire({
        allowOutsideClick: false,
        title: "Cargando...",
        text: "Espere por favor",
      });
      swal.showLoading();
      this.hhtpclient.get('https://restcountries.com/v2/lang/es').subscribe((res:any)=>{
        this.paises = res;
        swal.close();
        this.llenarPos();
      },err=>{
        swal.close();
      swal.fire({
        allowOutsideClick: true,
        title: "Error...",
        text: "Algo salio mal...Revisa tu conexion a internet ",
        confirmButtonText:'Entendido'
      });
      });
      this.auth.setUser("");
      
      
    }

  ngOnInit(): void {
   this.getEmail();
 
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
  llenarPos(){
    this.posiciones=[];
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
}
