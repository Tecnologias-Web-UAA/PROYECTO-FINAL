import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaProductoUserComponent } from './consulta-producto-user/consulta-producto-user.component';
import { InicioUserComponent } from './inicio-user/inicio-user.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { NavbarTopUserComponent } from './navbar-top-user/navbar-top-user.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ConsultaProductoUserComponent,
    InicioUserComponent,
    NavbarUserComponent,
    NavbarTopUserComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class UsuarioModule { }
