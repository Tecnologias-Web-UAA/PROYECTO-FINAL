import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InicioComponent } from './admin/inicio/inicio.component';
import { AccesibilidadService } from './shared/accesibilidad.service';
import { SignupComponent } from './signup/signup.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    InicioComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AccesibilidadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
