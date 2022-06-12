import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { AltasComponent } from './altas/altas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    InicioComponent,
    AltasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule
  ]
})
export class AdministradorModule { }
