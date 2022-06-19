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
import { CapitalizacionPipePipe } from './pipe/capitalizacion-pipe.pipe';
import { LoginMsmComponent } from './login-msm/login-msm.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    HomeComponent,
    ContactoComponent,
    FAQComponent,
    CapitalizacionPipePipe,
    LoginMsmComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    AdministradorModule,
    HttpClientModule,
    UsuarioModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [AccesibilidadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
