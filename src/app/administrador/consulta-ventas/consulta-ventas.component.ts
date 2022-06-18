import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/shared/peticiones.service';

@Component({
  selector: 'app-consulta-ventas',
  templateUrl: './consulta-ventas.component.html',
  styleUrls: ['./consulta-ventas.component.scss']
})
export class ConsultaVentasComponent implements OnInit {
  band:Boolean=false;
  constructor(private peticiones:PeticionesService) { }
  ventas:any[]=[
    {
      correoUsario:'',
      costo:'',
      id:'',
      imgProducto:'',
      paisOrigen:'',
      nombrePais:''
    }
  ];
  ngOnInit(): void {
    this.peticiones.consultaTodo('consultaTodo','ventas').subscribe((res:any)=>{
      this.ventas = res.myarray;
    })
  }
  click(){
    this.band==false?this.band=true:this.band=false;
  }
}
