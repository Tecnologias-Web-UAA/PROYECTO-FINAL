import { Component, OnInit } from '@angular/core';
import { Producto } from '.././../producto.model';
import swal from 'sweetalert2';
import { ProductoService } from 'src/app/shared/producto.service';
import { PeticionesService } from '../../shared/peticiones.service';
import { Router } from '@angular/router';
import { Ventas } from '../../modelos/ventas.model';
import { VentaService } from '../../shared/venta.service';
import { AuthService } from '../../shared/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  band:boolean = false;
  products!:Producto[];
  obj!:any;
  productoqr!:Producto;
  msgCompra:string = "";
  datosVenta!:Ventas;
  compraProducto!:Producto;
  paises: any[] = [];
  product!:any;

  constructor(private productoService:ProductoService, private peticionesServicio:PeticionesService, private ventaService:VentaService, private authService:AuthService, private httpCliente: HttpClient, private router:Router) { 
    this.httpCliente.get('https://restcountries.com/v2/lang/es').subscribe(
      (resp:any) => { this.paises=resp;},
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    this.productoService.getProducts().subscribe(products =>{
      this.products = products;
      swal.close();
    })
  }

  comprar(id:any){
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    this.peticionesServicio.comprarProducto(id).subscribe((resul:any) => {
      this.msgCompra = resul.msg;
      this.compraProducto = resul.producto
      swal.close();
    });

    this.addVen(id);
  }

  addVen(id:any){
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    this.peticionesServicio.comprarProducto(id).subscribe((resul:any) => {
      this.msgCompra = resul.msg;
      this.product = resul.producto;
      /* console.log(precio);
      console.log('Cantidad nueva = '+resul.cantidadnew); */
      let user = this.authService.getUserLogged().subscribe((res:any) =>{
        let aleatorio = this.random();
        this.datosVenta = {
          correoUsario: res.email,
          costo:  this.product.precio,
          imgProducto: this.product.imagen,
          paisOrigen: this.paises[aleatorio].flag,
          nombrePais: this.paises[aleatorio].name,
        }
        this.ventaService.addVenta(this.datosVenta)
      });
      swal.close();
    });
    
  }

  click(){
    this.band==false?this.band=true:this.band=false;
  }

  clickqr(id:any){

    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    this.peticionesServicio.qrangular(id).subscribe((producto:any) => {
      this.productoqr = producto['respuesta'];
      this.router.navigate(['/qr',this.productoqr.nombre,this.productoqr.id,this.productoqr.cantidad,this.productoqr.precio,this.productoqr.descripcion,this.productoqr.imagen]);
      swal.close();
    });

  }

  random():number{
    return Math.round(Math.random() * (23 - 0) + 0)
  }

}
