import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/producto.model';
import { ProductoService } from 'src/app/shared/producto.service';

@Component({
  selector: 'app-consulta-productos',
  templateUrl: './consulta-productos.component.html',
  styleUrls: ['./consulta-productos.component.scss']
})
export class ConsultaProductosComponent implements OnInit {
  productos!:Producto[];
  constructor(private productosService:ProductoService) { }

  ngOnInit(): void {
    this.productosService.getProducts().subscribe(products =>{
      this.productos = products;
    });
  }

}
