import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Compra } from 'src/app/modelos/compra.model';
import { PeticionesService } from 'src/app/shared/peticiones.service';
import swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { getStorage, ref,listAll, getDownloadURL } from "firebase/storage";
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-editar-compra',
  templateUrl: './editar-compra.component.html',
  styleUrls: ['./editar-compra.component.scss']
})
export class EditarCompraComponent implements OnInit {
  id!:string;
  file!:any;
  myCompra!:Compra;
  myForm!:FormGroup;
  bandera:boolean=false;
  band:boolean=false;
  porcentaje!:Observable<number|any>;
  imageUrl:string='../../../assets/img/upload.png';
  myImages:any[]=[];
  band_select:boolean=true;
  dirImagen!:string;
  constructor(private activatedRoute:ActivatedRoute,private peticiones:PeticionesService,private storage:AngularFireStorage,
    private router:Router) { 
    this.activatedRoute.params.subscribe(params=>{
     this.id = params['id']; 
      this.getCompra();
      
      
   });
   this.myForm = new FormGroup({
    'nombre': new FormControl('',[Validators.required]),
    'descripcion':new FormControl('',[Validators.required]),
    'precio_unitario': new FormControl('',[Validators.required]),
    'cantidad': new FormControl('',[Validators.required]),
    'imagen':new FormControl('',[Validators.required]),
    'fecha':new FormControl({value:'',disabled:true},[Validators.required]),
    'total':new FormControl({value:'',disabled:true},[Validators.required])
   });



  }

  ngOnInit(): void {
    //obtiene todos los links de las imagenes que se encuentran en storage de firebase
    let storage = getStorage();
    const spaceRef = ref(storage, 'productos');
    
    listAll(spaceRef)
    .then(async res=>{
      for(let i of res.items){
        const url = await getDownloadURL(i);
        this.myImages.push(url);
      
      }
    })
    .catch(err=>console.log(err));
  }
  getCompra(){
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    this.peticiones.consultaUno(`consultaUno/compras/${this.id}`).subscribe((res:any)=>{
      console.log(res.data);
      this.myCompra = res.data;
      //agregamos los datos solicitados a los campos de nuestro reactive form
      this.myForm.get('nombre')?.setValue(this.myCompra.nombre);
      this.myForm.get('descripcion')?.setValue(this.myCompra.descripcion);
      this.myForm.get('precio_unitario')?.setValue(this.myCompra.precio_unitario);
      this.myForm.get('cantidad')?.setValue(this.myCompra.cantidad);
      this.myForm.get('imagen')?.setValue(this.myCompra.imagen);
      this.myForm.get('fecha')?.setValue(this.myCompra.fecha);
      this.myForm.get('total')?.setValue(this.myCompra.total);
      this.imageUrl=this.myForm.value.imagen;
      swal.close();
    });
    
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
                        this.myForm.value.imagen=this.dirImagen; //CHECAR INSTRUCCION "DUDA DE SI FUNCIONA"
                        this.band=false;
                       
                        
                        this.imageUrl='../../../assets/img/upload.png';
                        //Una alta significa que compramos, por lo que agregamos tambien a compras
                        this.peticiones.actualizar(`actualizarAlgo/compras/${this.id}`,this.myForm.getRawValue()).subscribe(res=>{
                          console.log(res);
                        });
                        this.myForm.reset();
                    });
              })
          )
          .subscribe(()=>{
          });
        }else{
          this.imageUrl='../../../assets/img/upload.png';
          this.peticiones.actualizar(`actualizarAlgo/compras/${this.id}`,this.myForm.getRawValue()).subscribe(res=>{
            console.log(res);
          });
          this.myForm.reset();
        }

        swal.fire({
         
          title: "Operación exitosa...",
          text: "Los datos fueron actualizados ",
          icon:'success',
          confirmButtonText:'Entendido'
         
        });
        this.router.navigate(['/consultaCompras']);
  }
  mostrar(event:any) {
    //Muestra la imagen en un previo antes de enviarla a la nube de storage (firabase)
    this.file = event.target.files[0];
  

    const reader = new FileReader();
    reader.onload = () => 
    this.imageUrl = reader.result as string;
  
    reader.readAsDataURL(this.file);
    this.band_select = false;
  }
  click(){
    this.bandera==false?this.bandera=true:this.bandera=false;
  }
  modifica(){
    let precio = this.myForm.value.precio_unitario;
    let cantidad =this.myForm.value.cantidad;
    console.log(this.myForm.getRawValue());
    this.myForm.get('total')?.setValue(precio*cantidad);
    
  }
  cargaImagen(event:any){
     //en caso de que la imagen se elija como una que ya existe en storage de firebase 
    let img =this.imageUrl = event.target.src;
    this.myForm.get('imagen')?.setValue(img) ;
    //quita validacion del campo imagen
    this.myForm.get('imagen')?.setValidators([]);
    this.myForm.get('imagen')?.updateValueAndValidity();
    this.band_select = true;
    console.log(this.myForm.value)
  }
}
