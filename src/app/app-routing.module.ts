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
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { InicioUserComponent } from './usuario/inicio-user/inicio-user.component';
import { FAQComponent } from './faq/faq.component';

const routes: Routes = [
  {'path':'sign-up',component:SignupComponent},
  {'path':'sign-in',component:LoginComponent},
  {'path':'',component:HomeComponent},
  {'path':'inicioAdmin',component:InicioComponent},
  {'path':'loading',component:LoadingComponent},
  {'path':'app',component:AppComponent},
  {'path':'home',component:HomeComponent},
  {'path':'contacto',component:ContactoComponent},
  {'path':'altas',component:AltasComponent},
  {'path':'consultaProducto',component:ConsultaProductosComponent},
  {'path':'actualizarProducto',component:ActualizarProductoComponent},
  {'path':'editarProducto/:id',component:EditarProductoComponent},
  {'path':'navbarAdmin',component:NavbarComponent},
  {'path':'inicioUser',component:InicioUserComponent},
  {'path':'faq',component:FAQComponent},
  {'path':'consultaCompras',component:ConsultaComprasComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
