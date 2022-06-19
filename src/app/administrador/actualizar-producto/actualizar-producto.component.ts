import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/producto.model';
import swal from 'sweetalert2';
import { ProductoService } from 'src/app/shared/producto.service';
@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.scss']
})
export class ActualizarProductoComponent implements OnInit {
  myForm!:FormGroup;
 products!:Producto[];
 band:boolean=false;
  constructor(private productoService:ProductoService,private router:Router) { 
    this.myForm=new FormGroup({
      'nombre':new FormControl('',[Validators.required,Validators.minLength(2)]),
      'descripcion':new FormControl(''),
      'precio':new FormControl('',[Validators.required]),
      'cantidad':new FormControl('',[Validators.required]),
      'imagen':new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void { 
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    }).then(res=>{
      swal.showLoading();
    
    });
    this.productoService.getProducts().subscribe(products =>{
      this.products = products;
      swal.close();
    },err=>{
      //si la subscripcion da error mostramos error y cerramos loading 
      swal.close();
      swal.fire({
        allowOutsideClick: true,
        title: "Error...",
        text: "Algo salio mal...Revisa tu conexion a internet ",
        confirmButtonText:'Entendido'
      });
    });
  }
  update(id:string|undefined){
    console.log(id);
    this.router.navigate(['editarProducto',id]);
  }
  click(){
    this.band==false?this.band=true:this.band=false;
  }
  eliminar(product:Producto){
    this.productoService.deleteProduct(product);
  }
}
