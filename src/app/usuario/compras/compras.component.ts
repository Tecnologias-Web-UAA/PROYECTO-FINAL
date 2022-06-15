import { Component, OnInit } from '@angular/core';
import { Producto } from '.././../producto.model';
import swal from 'sweetalert2';
import { ProductoService } from 'src/app/shared/producto.service';
import { PeticionesService } from '../../shared/peticiones.service';
import { Router } from '@angular/router';

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

  constructor(private productoService:ProductoService, private peticionesServicio:PeticionesService, private router:Router) { }

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

  }

  click(){
    this.band==false?this.band=true:this.band=false;
  }

  clickqr(id:any){
    this.peticionesServicio.qrangular(id).subscribe((producto:any) => {
      this.productoqr = producto['respuesta'];
      this.router.navigate(['/qr',this.productoqr.nombre,this.productoqr.id,this.productoqr.cantidad,this.productoqr.precio,this.productoqr.descripcion,this.productoqr.imagen]);
      /*'qr/:nombre/:id/:cantidad/:precio/:descripcion/:img'*/
    });
  }

}
