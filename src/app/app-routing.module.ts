import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarProductoComponent } from './administrador/actualizar-producto/actualizar-producto.component';
import { AltasComponent } from './administrador/altas/altas.component';
import { ConsultaComprasComponent } from './administrador/consulta-compras/consulta-compras.component';
import { ConsultaProductosComponent } from './administrador/consulta-productos/consulta-productos.component';
import { EditarProductoComponent } from './administrador/editar-producto/editar-producto.component';
import { InicioComponent } from './administrador/inicio/inicio.component';
import { AppComponent } from './app.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { InicioUserComponent } from './usuario/inicio-user/inicio-user.component';
import { FAQComponent } from './faq/faq.component';

import { EditarCompraComponent } from './administrador/editar-compra/editar-compra.component';

import { ComprasComponent } from './usuario/compras/compras.component';
import { GenerarQrComponent } from './usuario/generar-qr/generar-qr.component';
import { GraficaExistenciasProdComponent } from './administrador/grafica-existencias-prod/grafica-existencias-prod.component';


const routes: Routes = [
  //seccion general...
  {'path':'sign-up',component:SignupComponent},
  {'path':'sign-in',component:LoginComponent},
  {'path':'',component:HomeComponent},
  {'path':'app',component:AppComponent},
  {'path':'home',component:HomeComponent},
  {'path':'contacto',component:ContactoComponent},
  
  //seccion Admin
  {'path':'inicioAdmin',component:InicioComponent},
  {'path':'altas',component:AltasComponent},
  {'path':'consultaProducto',component:ConsultaProductosComponent},
  {'path':'actualizarProducto',component:ActualizarProductoComponent},
  {'path':'editarProducto/:id',component:EditarProductoComponent},
  {'path':'navbarAdmin',component:NavbarComponent},
  {'path':'editarCompra/:id',component:EditarCompraComponent},
  {'path':'consultaCompras',component:ConsultaComprasComponent},
  //seccion User
  {'path':'inicioUser',component:InicioUserComponent},
  {'path':'faq',component:FAQComponent},

  {'path':'consultaCompras',component:ConsultaComprasComponent},
  {'path':'compras',component:ComprasComponent},
  {'path':'qr/:nombre/:id/:cantidad/:precio/:descripcion/:img', component:GenerarQrComponent},
  {'path':'graficaExistenciaProd', component:GraficaExistenciasProdComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
