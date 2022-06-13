import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/producto.model';

import { ProductoService } from 'src/app/shared/producto.service';
@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.scss']
})
export class ActualizarProductoComponent implements OnInit {
  myForm!:FormGroup;
 products!:Producto[];
  constructor(private producto:ProductoService,private router:Router) { 
    this.myForm=new FormGroup({
      'nombre':new FormControl('',[Validators.required,Validators.minLength(2)]),
      'precio':new FormControl('',[Validators.required]),
      'cantidad':new FormControl('',[Validators.required]),
      'imagen':new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void { 
    this.producto.getProducts().subscribe(products =>{
      this.products = products;
    });
  }
  update(id:string|undefined){
    console.log(id);
    this.router.navigate(['editarProducto',id]);
  }
}
