import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/shared/producto.service';
import { ViewChild,ElementRef } from '@angular/core';
import { argv } from 'process';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.scss']
})
export class AltasComponent implements OnInit {
  myForm!:FormGroup;
  band:boolean=false;
  porcentaje!:Observable<number|any>;
  dirImagen!:string;
  file!:any;
  imageUrl:string='../../../assets/img/upload.png';
  @ViewChild("foto", {
    read: ElementRef
  }) foto!: ElementRef;
  constructor(private producto:ProductoService,private storage:AngularFireStorage) {
    this.myForm=new FormGroup({
      'nombre':new FormControl('',[Validators.required,Validators.minLength(2)]),
      'precio':new FormControl('',[Validators.required]),
      'cantidad':new FormControl('',[Validators.required]),
      'imagen':new FormControl('',[Validators.required])
    });
   }

  ngOnInit(): void {
  }
  alta(){
    this.band=true;
    const id = Math.random().toString(36).substring(2);
    const filePath = `productos/${id}_${this.file.name}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,this.file);
    this.porcentaje = task.percentageChanges();
    
      task.snapshotChanges().pipe(
                finalize(() => {
                    ref.getDownloadURL().subscribe(downloadURL => {
                      this.dirImagen=downloadURL;
                        console.log(this.dirImagen);
                        this.myForm.value.imagen=this.dirImagen;
                        this.band=false;
                        this.producto.addProduct(this.myForm.value);
                        this.myForm.reset();
                        this.imageUrl='../../../assets/img/upload.png';
                    });
              })
          )
          .subscribe(()=>{
          });
    // let archivos = this.foto.nativeElement.files[0];
    // console.log(archivos);
  
  
  }
  
  mostrar(event:any) {
      this.file = event.target.files[0];
    

    const reader = new FileReader();
    reader.onload = () => 
      this.imageUrl = reader.result as string;
    
    reader.readAsDataURL(this.file);
  }
}
