import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators } from '@angular/forms';
import { AccesibilidadService } from '../shared/accesibilidad.service';
import { AuthService } from '../shared/auth.service';
import { ValidacionPropia } from './ValidacionPropia';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  myForm!:FormGroup;
 
  constructor(private auth:AuthService,public accesibilidad:AccesibilidadService) { 
    this.myForm=new FormGroup({
      
      'correo':new FormControl('',[Validators.required,Validators.email]),
      'contrasena':new FormControl('',[Validators.required,Validators.minLength(7)]),
      'contrasena2':new FormControl('',[Validators.required,Validators.minLength(7)]),
      'check':new FormControl('')
      

    },
    {validators:ValidacionPropia.contrasenasIguales}
    );
  }

  ngOnInit(): void {
  }
  registrar(){
   
    console.log(this.myForm.value);
    let {correo,contrasena}=this.myForm.value;
    this.auth.setSignUp(correo,contrasena);
    // this.auth.signUp(correo,contrasena).then((res)=>{
    //   // this.auth.setUser();
    //   this.auth.setSignUp(res);
    //   console.log(res);
    //   // this.auth.SendVerificationMail();
    // });
  }
  //Contraseñas iguales....validacioens personalizadas en reactive Forms
  //link de consulta...
  //https://juliescript.dev/validacion-personalizada-angular/
  checarSiSonIguales():  boolean|undefined  {
    return  this.myForm.hasError('noSonIguales')  &&
      this.myForm.get('contrasena')?.dirty &&
      this.myForm.get('contrasena2')?.dirty;
  }
}
