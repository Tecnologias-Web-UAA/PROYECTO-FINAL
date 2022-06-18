import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RecaptchaVerifier } from 'firebase/auth';
import * as auth from 'firebase/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  recaptchaVerifier: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.createCaptcha();
  }

  createCaptcha(){
    this.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{size: 'invisible'}, auth.getAuth());
    this.recaptchaVerifier.render();
  }
  sendCode(phone: string){
    this.authService.sendCode(phone, this.recaptchaVerifier);
  }

}
