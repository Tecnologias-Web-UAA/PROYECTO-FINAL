import { Injectable,NgZone } from '@angular/core';
import{AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AccesibilidadService } from './accesibilidad.service';
import * as auth from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = null; // Almacenar información de usuario

  constructor(private afauth:AngularFireAuth,private router:Router,private accesibilidad:AccesibilidadService
    ,public ngZone: NgZone) { 


      this.afauth.onAuthStateChanged((user) => {
        if (user) {
          user.email !== null ? (this.userData = user?.email): (this.userData = user?.phoneNumber);
          this.ngZone.run(() => {
           
            this.router.navigate(['/inicioAdmin']);
          });
        } else {
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
}
