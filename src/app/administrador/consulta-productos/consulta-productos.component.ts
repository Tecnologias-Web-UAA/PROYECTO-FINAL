import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/producto.model';
import { ProductoService } from 'src/app/shared/producto.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-consulta-productos',
  templateUrl: './consulta-productos.component.html',
  styleUrls: ['./consulta-productos.component.scss']
})
export class ConsultaProductosComponent implements OnInit {
  productos!:Producto[];
  constructor(private productosService:ProductoService) { }

  ngOnInit(): void {
    swal.fire('espere','','success');
    this.productosService.getProducts().subscribe(products =>{
      this.productos = products;
    },err=>{
      swal.close();
      swal.fire({
        allowOutsideClick: true,
        title: "Error...",
        text: "Algo salio mal...Revisa tu conexion a internet ",
        confirmButtonText:'Entendido'
      });
    });
  }

}
