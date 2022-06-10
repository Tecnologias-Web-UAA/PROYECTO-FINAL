import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './administrador/inicio/inicio.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {'path':'sign-up',component:SignupComponent},
  {'path':'sign-in',component:LoginComponent},
  {'path':'',component:LoginComponent},
  {'path':'inicioAdmin',component:InicioComponent},
  {'path':'loading',component:LoadingComponent},
  {'path':'app',component:AppComponent},
  {'path':'home',component:HomeComponent},
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
