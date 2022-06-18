import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/shared/producto.service';
import { ViewChild,ElementRef } from '@angular/core';
import { argv } from 'process';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { PeticionesService } from 'src/app/shared/peticiones.service';
import { Compra } from 'src/app/modelos/compra.model';
import { getStorage, ref,listAll, getDownloadURL } from "firebase/storage";
@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.scss']
})
export class AltasComponent implements OnInit {
  myForm!:FormGroup;
  band:boolean=false;
  bandera:boolean=false;
  porcentaje!:Observable<number|any>;
  dirImagen!:string;
  file!:any;
  imageUrl:string='../../../assets/img/upload.png';
  myImages:any[]=[];
  band_select:boolean=false;
  @ViewChild("foto", {
    read: ElementRef
  }) foto!: ElementRef;
  constructor(private producto:ProductoService,private storage:AngularFireStorage,
    private auth:AuthService,public peticionesService:PeticionesService) {
    this.myForm=new FormGroup({
      'nombre':new FormControl('',[Validators.required,Validators.minLength(2)]),
      'descripcion':new FormControl('',[Validators.required]),
      'precio':new FormControl('',[Validators.required]),
      'cantidad':new FormControl('',[Validators.required]),
      'fecha':new FormControl('',[Validators.required]),
      'imagen':new FormControl('',[Validators.required])
      
    });
   }

  ngOnInit(): void {
    //obtiene todos los links de las imagenes que se encuentran en storage de firebase,
    //guardandolas en un array y mostrarlas en un dropdown
    //en caso de que el usuario desee seleccionar una imagen que ya esta cargada en firestorage
    let storage = getStorage();
    const spaceRef = ref(storage, 'productos');
    let myref=this.storage.ref('productos');
    listAll(spaceRef)
    .then(async res=>{
      for(let i of res.items){
        const url = await getDownloadURL(i);
        this.myImages.push(url);
      
      }
    })
    .catch(err=>console.log(err));
      
    
  }
  alta(){
    this.band=true;
    const id = Math.random().toString(36).substring(2);
    if(!this.band_select){
    
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
                        this.producto.addProduct(this.myForm.value);
                        
                        this.imageUrl='../../../assets/img/upload.png';
                        //Una alta significa que compramos, por lo que agregamos tambien a compras
                        let compra:Compra={
                          id: id,
                          descripcion:this.myForm.value.descripcion,
                          nombre: this.myForm.value.nombre,
                          precio_unitario: this.myForm.value.precio*0.90,
                          cantidad: this.myForm.value.cantidad,
                          imagen:this.dirImagen,
                          fecha:this.myForm.value.fecha,
                          total:this.myForm.value.cantidad*this.myForm.value.precio
                        };
                        this.peticionesService.altas(compra,'altaCompra/compras').subscribe(res=>{
                          console.log('compra alta '+res)
                        });
                        this.myForm.reset();
                    });
              })
          )
          .subscribe(()=>{
          });
          }else{
            this.producto.addProduct(this.myForm.value);
            let compra:Compra={
              id: id,
              descripcion:this.myForm.value.descripcion,
              nombre: this.myForm.value.nombre,
              precio_unitario: this.myForm.value.precio,
              cantidad: this.myForm.value.cantidad,
              imagen:this.myForm.value.imagen,
              fecha:this.myForm.value.fecha,
              total:this.myForm.value.cantidad*this.myForm.value.precio
            };
            this.peticionesService.altas(compra,'altaCompra/compras').subscribe(res=>{
              console.log('compra alta '+res)
            });
            this.myForm.reset();
          }
    // let archivos = this.foto.nativeElement.files[0];
    // console.log(archivos);
  
  
  }
  
  mostrar(event:any) {
      this.file = event.target.files[0];
    

      const reader = new FileReader();
      reader.onload = () => 
      this.imageUrl = reader.result as string;
      
      this.band_select = false;
      reader.readAsDataURL(this.file);
  }
  click(){
    this.bandera==false?this.bandera=true:this.bandera=false;
  }
  cargaImagen(event:any){
     //en caso de que la imagen se elija como una que ya existe en storage de firebase 
    let img =this.imageUrl = event.target.src;
    this.myForm.value.imagen = img;
    this.myForm.get('imagen')?.setValidators([]);
    this.myForm.get('imagen')?.updateValueAndValidity();
    this.band_select = true;
    console.log(this.myForm.value)
  }
}
