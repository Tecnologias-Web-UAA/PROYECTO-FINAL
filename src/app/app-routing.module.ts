import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './admin/inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {'path':'sign-up',component:SignupComponent},
  {'path':'sign-in',component:LoginComponent},
  {'path':'',component:LoginComponent},
  {'path':'inicioAdmin',component:InicioComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
