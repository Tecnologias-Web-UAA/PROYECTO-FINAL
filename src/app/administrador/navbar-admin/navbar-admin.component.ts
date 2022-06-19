import { Component, Input, OnInit } from '@angular/core';
import { AccesibilidadService } from 'src/app/shared/accesibilidad.service';
import { AuthService } from '../../shared/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {
  @Input() band:Boolean=false;
  user:string='hola';
  imagenLogIn!:any;
  constructor(public accesibilidad:AccesibilidadService, private authService:AuthService) { 
    
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    this.authService.getUserLogged().subscribe((res:any)=>{

      this.user = res?.displayName;
      this.imagenLogIn = res?.photoURL;

      swal.close();
    },err=>{
      swal.close();
      swal.fire({
        allowOutsideClick: true,
        title: "Error...",
        text: "Algo salio mal...Revisa tu conexion a internet ",
        confirmButtonText:'Entendido'
      });
    }); 

  }

  ngOnInit(): void {
  }
  click(){
    this.band==false?this.band=true:this.band=false;
  }
  logOut(){

  }
}
