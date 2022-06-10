import { Injectable,NgZone } from '@angular/core';
import{AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AccesibilidadService } from './accesibilidad.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth:AngularFireAuth,private router:Router,private accesibilidad:AccesibilidadService
    ,public ngZone: NgZone) { }

  signIn(correo:string,contrasena:string){
    return this.afauth.signInWithEmailAndPassword(correo, contrasena)
    .catch((error) => {
      window.alert(error.message);
    });
  }
  signOut(){
    this.afauth.signOut()
    .then(()=>{
     
        this.accesibilidad.changeBand();
        this.router.navigate(['/']);
        
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
}
