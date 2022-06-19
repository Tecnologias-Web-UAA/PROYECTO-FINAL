import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {

  @Input() band:Boolean=false;
  user:string='hola';
  imagenLogIn!:any;

  constructor(private authService:AuthService) { 
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
