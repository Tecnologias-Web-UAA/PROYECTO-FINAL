import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/modelos/compra.model';
import { PeticionesService } from 'src/app/shared/peticiones.service';

@Component({
  selector: 'app-consulta-compras',
  templateUrl: './consulta-compras.component.html',
  styleUrls: ['./consulta-compras.component.scss']
})
export class ConsultaComprasComponent implements OnInit {
  band:boolean=false;
  compras!:Compra[];
  constructor(private peticiones:PeticionesService) { }

  ngOnInit(): void {
    this.peticiones.consultaTodo('consultaTodo','compras').subscribe((res:any)=>{
      this.compras = res.myarray;
      console.log(this.compras)
    });
  }
  click(){
    this.band==false?this.band=true:this.band=false;
  }
  update(id:any){

  }
  eliminar(compra:Compra){

  }
}
