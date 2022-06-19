import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccesibilidadService } from '../shared/accesibilidad.service';
import { RecaptchaVerifier } from 'firebase/auth';
import * as auth from 'firebase/auth';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-login-msm',
  templateUrl: './login-msm.component.html',
  styleUrls: ['./login-msm.component.scss']
})
export class LoginMsmComponent implements OnInit {
  myFormNumber!:FormGroup;
  myFormCode!:FormGroup;
  recaptchaVerifier: any;
  constructor(public accesibilidad:AccesibilidadService,public authService:AuthService) { 
    this.myFormNumber = new FormGroup({
      'numero':new FormControl('',[Validators.required,Validators.minLength(10)]),

    });
    this.myFormCode = new FormGroup({
      'codigo':new FormControl('',[Validators.required])

    });
  
  }

  ngOnInit(): void {
    this.createCaptcha();
  }
  createCaptcha(){
    this.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{size: 'invisible'}, auth.getAuth());
    this.recaptchaVerifier.render();
  }
  sendCode(){
    this.authService.sendCode(this.myFormNumber.value.numero, this.recaptchaVerifier);
  }
  verify(){
    this.authService.verifyCode(this.myFormCode.value.codigo).catch((err:any)=>{
      alert("error")
    });
  }
}
