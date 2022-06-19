import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Router } from '@angular/router';

import * as auth from 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier: auth.RecaptchaVerifier;
    confirmationResult: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any = null; // Almacenar información de usuario

  constructor(
    public afAuth: AngularFireAuth, // Injectar servicio Firebase auth
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        user.email !== null ? (this.userData = user?.email): (this.userData = user?.phoneNumber);
        this.ngZone.run(() => {
          this.router.navigate(['products']);
        });
      } else {
        this.userData = null;
      }
    });
  }

  // Inicio de Sesión con correo y contraseña
  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .catch((error) => {
      window.alert(error.message);
    });
  }

  // Registro con correo y contraseña
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Al llamar a SendVerificaitonMail() cuando un usuario nuevo se ha registrado retorna una promesa*/
        //this.SendVerificationMail();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Envío de verificación de email para nuevos usuarios
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['sign-in']);
      });
  }

  // Iniciar Sesión con Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['products']);
      }
    });
  }

  /* Lógica Auth para registro con proveedores 
  en este caso el proovedor recibido como parámetro es (Google)*/
  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider).catch((error) => {
        window.alert(error);
      });
  }

  //Enviar código a teléfono móvil
  sendCode(phone: string, appVerified: any) {
    return this.afAuth
      .signInWithPhoneNumber(phone, appVerified)
      .then((confirmation) => {
        window.confirmationResult = confirmation;
        window.alert('Código enviado a teléfono');
      })
      .catch((err) => {
        window.alert(err);
      });
  }

  //Verifica que el código ingresado corresponda.
  verifyCode(code: string) {
    return window.confirmationResult.confirm(code).then((result: any) => {
      let credentials = auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId,code);
      this.afAuth.signInWithCredential(credentials);
    });
  }

  // Cerrar Sesión
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['sign-in']);
    });
  }

  // Retorna true cuando un usuario ha iniciado sesión
  get isLoggedIn(): boolean {
    //En este caso sólo se verifica que exista un usuario.
    //Si quisieramos validar la verificación por email tendríamos que agregarlo a la condición
    return this.userData !== null ? true : false;
  }

}
