import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/modelos/compra.model';
import { PeticionesService } from 'src/app/shared/peticiones.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-consulta-compras',
  templateUrl: './consulta-compras.component.html',
  styleUrls: ['./consulta-compras.component.scss']
})
export class ConsultaComprasComponent implements OnInit {
  band:boolean=false;
  compras!:Compra[];
  id_doc!:string[];
  constructor(private peticiones:PeticionesService) { }

  ngOnInit(): void {
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    this.peticiones.consultaTodo('consultaTodo','compras').subscribe((res:any)=>{
      this.compras = res.myarray;
      this.id_doc = res.myids;
      console.log(this.id_doc);
      swal.close();
    });
  }
  click(){
    this.band==false?this.band=true:this.band=false;
  }
  update(id:any){

  }
  eliminar(id_compra:string){
    console.log("id: "+id_compra);
    this.peticiones.eliminar(`eliminarAlgo/compras/${id_compra}`).subscribe(res=>{
      console.log(res);
      this.peticiones.consultaTodo('consultaTodo','compras').subscribe((res:any)=>{
        this.compras = res.myarray;
        this.id_doc = res.myids;
        console.log(this.id_doc);
        
      });
    });
  }
}
