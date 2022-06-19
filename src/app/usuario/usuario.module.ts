import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioUserComponent } from './inicio-user/inicio-user.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { NavbarTopUserComponent } from './navbar-top-user/navbar-top-user.component';
import { AppRoutingModule } from '../app-routing.module';
import { GenerarQrComponent } from './generar-qr/generar-qr.component';
import { CapitalizadoPipe } from './pipes/capitalizado.pipe';
import { QRCodeModule } from 'angular2-qrcode';
import { ComprasComponent } from './compras/compras.component';
import { NgChartsModule } from 'ng2-charts';
import { ComprasHechasComponent } from './compras-hechas/compras-hechas.component'

@NgModule({
  declarations: [
    InicioUserComponent,
    NavbarUserComponent,
    NavbarTopUserComponent,
    GenerarQrComponent,
    CapitalizadoPipe,
    ComprasComponent,
    ComprasHechasComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    QRCodeModule,
    NgChartsModule
  ]
})
export class UsuarioModule { }
