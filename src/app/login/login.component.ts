import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccesibilidadService } from '../shared/accesibilidad.service';
import { AuthService } from '../shared/auth.service';
import swal from 'sweetalert2';
import { PeticionesService } from '../shared/peticiones.service';
import { User } from '../shared/auth.service';
//https://www.c-sharpcorner.com/article/how-to-use-sweetalert-in-angular10/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm!:FormGroup;
  usuarios:User[]=[];
  constructor(private auth:AuthService,public accesibilidad:AccesibilidadService,private router:Router,
    private peticiones:PeticionesService) {
    this.myForm=new FormGroup({
      'correo':new FormControl('',[Validators.required,Validators.email]),
      'contrasena':new FormControl('',[Validators.required,Validators.minLength(7)]),
      'check':new FormControl('')
    });
     this.auth.getUsers();
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
    
  
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    let {correo,contrasena}=this.myForm.value;
    this.auth.signIn(correo,contrasena).then((res)=>{
      if(res){
        this.accesibilidad.band=false;
        
        let i = this.auth.usuarios.findIndex(p => p.email == correo);
        console.log("correo "+this.auth.usuarios+" i "+i);
          if(i!=-1){
            if(this.auth.usuarios[i]?.privilegios=='admin'){
              this.router.navigate(['/inicioAdmin']);
          
            }else{
              this.router.navigate(['/inicioUser']);
          
            }
          }
          
            
          
        
          swal.close();
    
        if(this.myForm.value.check){
          localStorage.setItem('datosUser',JSON.stringify(this.myForm.value));
        }
        swal.close();
      }
    })
    .catch((error) => {
      swal.close();
      swal.fire({
      allowOutsideClick: true,
      title: "Error...",
      text: "Algo salio mal...Revisa tu conexion a internet o que tu contraseña y usuario sean correctos",
      confirmButtonText:'Entendido'
    });
      
      this.router.navigate(['/sign-in']);
    });;
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
        this.accesibilidad.band=false;
        
        let i = this.auth.usuarios.findIndex(p => p.email == res.user.email);
        console.log("correo "+this.auth.usuarios+" i "+i);
         
        if(i!=-1){
          if(this.auth.usuarios[i]?.privilegios=='admin'){
            this.router.navigate(['/inicioAdmin']);
        
          }else{
            this.router.navigate(['/inicioUser']);
        
          }
        }
      }
        
          swal.close();
       
        
      
    })
    .catch(err=>{
      swal.close();
      swal.fire({
      allowOutsideClick: true,
      title: "Error...",
      text: "Algo salio mal...Revisa tu conexion a internet ",
      confirmButtonText:'Entendido'
     
    });
    this.accesibilidad.band=true;
      this.router.navigate(['/sign-in']);
    });
  }
  logInMSM(){
    this.router.navigate(['/msmlogin']);
  }
}
