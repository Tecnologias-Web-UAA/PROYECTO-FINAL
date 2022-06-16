import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccesibilidadService } from '../shared/accesibilidad.service';
import { AuthService } from '../shared/auth.service';
import swal from 'sweetalert2';
//https://www.c-sharpcorner.com/article/how-to-use-sweetalert-in-angular10/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm!:FormGroup;
  constructor(private auth:AuthService,private accesibilidad:AccesibilidadService,private router:Router) {
    this.myForm=new FormGroup({
      'correo':new FormControl('',[Validators.required,Validators.email]),
      'contrasena':new FormControl('',[Validators.required,Validators.minLength(7)]),
      'check':new FormControl('')
    });
    
   }

  ngOnInit(): void {
    if(localStorage.getItem('datosUser')){
      let datos:any = localStorage.getItem('datosUser');
      datos = JSON.parse(datos);
      this.myForm.get('correo')?.setValue(datos.correo);
      this.myForm.get('contrasena')?.setValue(datos.contrasena);
       
    }
  }
  logIn(){
    
    if(this.myForm.value.check){
      localStorage.setItem('datosUser',JSON.stringify(this.myForm.value));
    }
    // swal.fire({
    //   allowOutsideClick: false,
    //   title: "Cargando...",
    //   text: "Espere por favor",
    // });
    // swal.showLoading();
    // let {correo,contrasena}=this.myForm.value;
    // this.auth.signIn(correo,contrasena).then((res)=>{
    //   if(res){
    //     this.accesibilidad.changeBand();
    //     this.router.navigate(['/inicioAdmin']);
    //     swal.close();
    //   }
    // });
  }
  logInGoogle(){
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
   
    this.auth.GoogleAuth().then((res: any) => {
      if (res) {
        this.accesibilidad.changeBand();
   
        this.router.navigate(['/inicioAdmin']);
        swal.close();
      }
    });;
  }
}
