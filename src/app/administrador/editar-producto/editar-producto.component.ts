import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Producto } from 'src/app/producto.model';
import { ProductoService } from 'src/app/shared/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs';
import { getStorage, ref,listAll, getDownloadURL } from "firebase/storage";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import swal from 'sweetalert2';
import { PeticionesService } from 'src/app/shared/peticiones.service';
@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {
  myForm:FormGroup=new FormGroup({
    'id':new FormControl(''),
    'nombre':new FormControl('',[Validators.required,Validators.minLength(2)]),
    'descripcion':new FormControl('',[Validators.required]),
    'precio':new FormControl('',[Validators.required]),
    'cantidad':new FormControl('',[Validators.required]),
    'imagen':new FormControl('',[Validators.required])
  });;
  myproducto!:any;
  file!:any;
  bandera:boolean=false;
  band:boolean=false;
  porcentaje!:Observable<number|any>;
  imageUrl:string='../../../assets/img/upload.png';
  myImages:any[]=[];
  band_select:boolean=true;
  dirImagen!:string;
  constructor(private producto:ProductoService,private activatedRoute:ActivatedRoute,private router:Router,
    private storage:AngularFireStorage,private peticiones:PeticionesService) {
    
    this.activatedRoute.params.subscribe(params=>{
      
      swal.fire({
        allowOutsideClick: false,
        title: "Cargando...",
        text: "Espere por favor",
      });
      swal.showLoading();

      this.peticiones.consultaUno(`consultaUno/producto/${params["id"]}`).subscribe((res:any)=>{
        console.log(res.data);
      //   this.myproducto = res.data;
      //   //agregamos los datos solicitados a los campos de nuestro reactive form
      //   this.myForm.get('id')?.setValue(this.myproducto.id);
      //   this.myForm.get('nombre')?.setValue(this.myproducto.nombre) ;
      //   this.myForm.get('descripcion')?.setValue(this.myproducto.descripcion) ;
      //   this.myForm.get('precio')?.setValue(this.myproducto.precio) ;
      //   this.myForm.get('cantidad')?.setValue(this.myproducto.cantidad) ;
      //   this.myForm.get('imagen')?.setValue(this.myproducto.imagen) ;
      //   this.imageUrl=this.myForm.value.imagen;
      //   swal.close();
      // });
      

       producto.getProduct(params['id']).subscribe(res=>{
        this.myproducto=res;
        // this.myForm=new FormGroup({
        //   'id':new FormControl(this.myproducto.id),
        //   'nombre':new FormControl(this.myproducto.nombre,[Validators.required,Validators.minLength(2)]),
        //   'descripcion':new FormControl(this.myproducto.descripcion,[Validators.required]),
        //   'precio':new FormControl(this.myproducto.precio,[Validators.required]),
        //   'cantidad':new FormControl(this.myproducto.cantidad,[Validators.required]),
        //   'imagen':new FormControl(this.myproducto.imagen,[Validators.required])
        // });
        this.myForm.get('id')?.setValue(this.myproducto.id);
        this.myForm.get('nombre')?.setValue(this.myproducto.nombre) ;
        this.myForm.get('descripcion')?.setValue(this.myproducto.descripcion) ;
        this.myForm.get('precio')?.setValue(this.myproducto.precio) ;
        this.myForm.get('cantidad')?.setValue(this.myproducto.cantidad) ;
        this.myForm.get('imagen')?.setValue(this.myproducto.imagen) ;

        this.imageUrl=this.myForm.value.imagen;
        swal.close();
      });
       
    });
    });
   }

  ngOnInit(): void {
    //obtiene todos los links de las imagenes que se encuentran en storage de firebase
    let storage = getStorage();
    const spaceRef = ref(storage, 'productos');
    //video que explica bien lo de mostrar imagenes de storage de firebase en angular...
    //https://www.youtube.com/watch?v=qS5R6Mjq36U
    listAll(spaceRef)
    .then(async res=>{
      for(let i of res.items){
        const url = await getDownloadURL(i);
        this.myImages.push(url);
      
      }
    })
    .catch(err=>console.log(err));
  
  }
  mostrar(event:any) {
    this.file = event.target.files[0];
  

    const reader = new FileReader();
    reader.onload = () => 
      this.imageUrl = reader.result as string;
  
    reader.readAsDataURL(this.file);
    this.band_select = false;
  }
  update(){
    const id = Math.random().toString(36).substring(2);
    console.log(this.myForm);
    //valida que no se haiga seleccionado una imagen que ya existe , ya que asi no habria necesidad de subirla de nuevo...
    if(!this.band_select){
      this.band=true;//controla el elemento progress,para que aparezca en pantalla
    
      const filePath = `productos/${id}_${this.file.name}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath,this.file);
      this.porcentaje = task.percentageChanges();
    //metodo para capturar el momento exactp de cuando nuestra imagen se subio al storage de firebase
    //ya que si no se hace esto puede que surjan errores al subir los datos a firestore
      task.snapshotChanges().pipe(
                  finalize(() => {
                    ref.getDownloadURL().subscribe(downloadURL => {
                      this.dirImagen=downloadURL;
                        console.log(this.dirImagen);
                        this.myForm.value.imagen=this.dirImagen;
                        this.band=false;
                      
                        
                        this.imageUrl='../../../assets/img/upload.png';
                        //Una alta significa que compramos, por lo que agregamos tambien a compras
                        this.producto.updateProduct(this.myForm.value);
                        this.myForm.reset();
                    });
              })
          )
          .subscribe(()=>{
          });
    }else{
      console.log("II valor: "+ this.myForm.value);
       this.producto.updateProduct(this.myForm.value);
     
      this.myForm.reset();
      this.imageUrl='../../../assets/img/upload.png';
    }
    
  
    this.router.navigate(['/actualizarProducto']);
  }
  click(){
    this.bandera==false?this.bandera=true:this.bandera=false;
  }
  cargaImagen(event:any){
    //en caso de que la imagen se elija como una que ya existe en storage de firebase 
    let img =this.imageUrl = event.target.src;
    this.myForm.get('imagen')?.setValue(img) ;
    this.myForm.get('imagen')?.setValidators([]);
    this.myForm.get('imagen')?.updateValueAndValidity();
    this.band_select = true;
    console.log(this.myForm.value)
  }
}
