import { Injectable,NgZone } from '@angular/core';
import{AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AccesibilidadService } from './accesibilidad.service';
import { getAuth } from "firebase/auth";
import * as auth from 'firebase/auth';
import { PeticionesService } from './peticiones.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = null; // Almacenar información de usuario
  //   
  obj!:User;
  constructor(private afauth:AngularFireAuth,private router:Router,private accesibilidad:AccesibilidadService
    ,public ngZone: NgZone,private peticiones:PeticionesService) { 


      this.afauth.onAuthStateChanged((user) => {
        if (user) {
          user.email !== null ? (this.userData = user?.email): (this.userData = user?.phoneNumber);
          this.ngZone.run(() => {
           this.accesibilidad.band=false;
            this.router.navigate(['/inicioAdmin']);
          });
        } else {
          this.accesibilidad.band=true;
          this.userData = null;
          this.router.navigate(['/sign-in']);
          
        }
      });
    }

  signIn(correo:string,contrasena:string){
    return this.afauth.signInWithEmailAndPassword(correo, contrasena);
    
  }
  signOut(){
    this.accesibilidad.changeBand();
    this.router.navigate(['/']);
    this.afauth.signOut()
    .then(()=>{
     
      console.log("sign-out exitoso");
        
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  signUp(correo:string,contrasena:string){
    return this.afauth.createUserWithEmailAndPassword(correo, contrasena)
    .catch((error) => {
      window.alert(error.message);
    });
  }

  getUserLogged(){
    return this.afauth.authState;
  }

  // Iniciar Sesión con Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  /* Lógica Auth para registro con proveedores 
  en este caso el proovedor recibido como parámetro es (Google)*/
  AuthLogin(provider: any) {
    return this.afauth.signInWithPopup(provider);
  }
  isLogged(){
    return
  }
  //metodo que se encarga de dar de alta al usuario que se registra por primera vez en la coleccion usuario,
  //para despues consultar todos los usuarios en la cuenta de admin..
  setUser(){
    let auth:any = getAuth();

    let profile:any = auth.currentUser;
    if (profile !== null) {
     
        // user.providerData.forEach((profile:any) => {
         this.obj = {
          'name':profile.displayName,
          'email': profile.email,
          'uid': profile.uid,
          'provider':profile.providerId,
          'photo':profile.photoURL,
          'privilegios':'user'
        };
        
        
        console.log(this.obj)
        
      // });
      let array:any[] = [];
      this.peticiones.consultaTodo('consultaTodo','usuario').subscribe((res:any)=>{
        array = res.myarray;
        let i = array.findIndex(p=>p.email == this.obj.email);
        if(i == -1){
          this.peticiones.altas(this.obj,'altaAlgo/usuario').subscribe(res=>{
            console.log(res)
          });
        }
      });
      
      
    }
   
  }
}
interface User{
  name:string;
  email:string;
  uid:string;
  provider:string;
  photo:string;
  privilegios:string;
}