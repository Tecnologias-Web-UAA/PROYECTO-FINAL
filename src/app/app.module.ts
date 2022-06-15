import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccesibilidadService } from './shared/accesibilidad.service';
import { SignupComponent } from './signup/signup.component';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AdministradorModule } from './administrador/administrador.module';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import {HttpClientModule} from '@angular/common/http';
import { UsuarioModule } from './usuario/usuario.module';
import { FAQComponent } from './faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    HomeComponent,
    ContactoComponent,
    FAQComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    AdministradorModule,
    HttpClientModule,
    UsuarioModule
  ],
  providers: [AccesibilidadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
