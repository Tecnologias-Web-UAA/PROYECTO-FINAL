import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { AltasComponent } from './altas/altas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ConsultaProductosComponent } from './consulta-productos/consulta-productos.component';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { AppRoutingModule } from '../app-routing.module';
import { TopbarComponent } from './topbar/topbar.component';
@NgModule({
  declarations: [
    InicioComponent,
    AltasComponent,
    ConsultaProductosComponent,
    ActualizarProductoComponent,
    EditarProductoComponent,
    NavbarAdminComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule,
    AppRoutingModule
  ]
})
export class AdministradorModule { }
