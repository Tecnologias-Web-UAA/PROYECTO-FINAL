import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService, AuthGuard
  ],
  exports: [
    SignInComponent,
    SignUpComponent
  ]
})
export class AuthenticationModule { }
