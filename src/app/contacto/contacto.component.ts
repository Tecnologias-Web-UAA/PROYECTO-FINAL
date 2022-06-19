import { Component, OnInit } from '@angular/core';
import { AccesibilidadService } from '../shared/accesibilidad.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import swal from 'sweetalert2';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  datos:FormGroup;
  constructor(private httpclien:HttpClient, public accesibilidad:AccesibilidadService){
    this.datos=new FormGroup({
      correo:new FormControl('',[Validators.required,Validators.email]),
      asunto: new FormControl('',Validators.required),
      msj: new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
  
  }

  envio(){
    swal.fire({
      allowOutsideClick: true,
      title: "Enviado...",
      icon:'success',
      text: "El correo se envio exitosamente",
      confirmButtonText:'Entendido'
     
    }); 
    let params={
      email:this.datos.value.correo,
      asunto:this.datos.value.asunto,
      mensaje:this.datos.value.msj     
      }
    console.log(params)
    
    this.httpclien.post('https://electronica-halcon.herokuapp.com:/envio',params).subscribe(resp=>{
      
     console.log(resp);
      
    },err=>{
      
    });
    this.datos.reset();
  }
}



