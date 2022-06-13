import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Producto } from 'src/app/producto.model';
import { ProductoService } from 'src/app/shared/producto.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {
  myForm!:FormGroup;
  myproducto!:any;
  file!:any;
  band:boolean=false;
  porcentaje!:Observable<number|any>;
  imageUrl:string='../../../assets/img/upload.png';
  constructor(private producto:ProductoService,private activatedRoute:ActivatedRoute) {
    
    this.activatedRoute.params.subscribe(params=>{
      
      
       producto.getProduct(params['id']).subscribe(res=>{this.myproducto=res
        this.myForm=new FormGroup({
          'id':new FormControl(this.myproducto.id),
          'nombre':new FormControl(this.myproducto.nombre,[Validators.required,Validators.minLength(2)]),
          'precio':new FormControl(this.myproducto.precio,[Validators.required]),
          'cantidad':new FormControl(this.myproducto.cantidad,[Validators.required]),
          'imagen':new FormControl(this.myproducto.imagen,[Validators.required])
        });
        this.imageUrl=this.myForm.value.imagen;
      });
       
    });
    
   }

  ngOnInit(): void {
 
  
  }
  mostrar(event:any) {
    this.file = event.target.files[0];
  

  const reader = new FileReader();
  reader.onload = () => 
    this.imageUrl = reader.result as string;
  
  reader.readAsDataURL(this.file);
  }
  update(){
    console.log(this.myForm);
    this.producto.updateProduct(this.myForm.value);
  }
}
