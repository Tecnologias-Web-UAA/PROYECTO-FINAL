import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '.././../producto.model';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.scss']
})
export class GenerarQrComponent implements OnInit {

  size = 300;
  fondo = 'rgb(200, 220, 250)';
  colorqr = 'rgb(0, 78, 196)';
  obj!:Producto;
  qrInformacion='';
  consulta!:Producto;
  alter!:any;
  informacion:string="";
  nombre = 'jUAN carlos rodriguez mares';
  band:boolean=false;
  nombreprod:string="";
  
  constructor(private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(params=>{/**nombre/:id/:cantidad/:precio/:descripcion/:img/ */
      //console.log(params['nombre'],params['id'],params['img'],params['cantidad'],params['precio'],params['descripcion']);
      this.qrInformacion=`Nombre del producto:${params['nombre']}\nPrecio: $${params['precio']}\n\nDescripcion:\n${params['descripcion']}`;
      this.nombreprod = params['nombre'];
   });
    
  }

  ngOnInit(): void {
  }

  click(){
    this.band==false?this.band=true:this.band=false;
  }

}
