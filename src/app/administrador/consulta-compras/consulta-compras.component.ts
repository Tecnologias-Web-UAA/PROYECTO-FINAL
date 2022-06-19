import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Compra } from 'src/app/modelos/compra.model';
import { AuthService } from 'src/app/shared/auth.service';
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
  sum:number=0;
  constructor(private auth:AuthService,private peticiones:PeticionesService,private router:Router) { }

  ngOnInit(): void {
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
      confirmButtonText:'Entendido',
      timer:10000
    });
    swal.showLoading();
    this.peticiones.consultaTodo('consultaTodo','compras').subscribe((res:any)=>{
      this.compras = res.myarray;
      this.id_doc = res.myids;
      console.log(this.id_doc);
      this.sum = 0;
        for (let i = 0; i < this.compras.length; i++) {
          this.sum += this.compras[i].total;
      }
      swal.close();
    },err=>{
      
      swal.close();
      swal.fire({
        allowOutsideClick: true,
        title: "Error...",
        text: "Algo salio mal...Revisa tu conexion a internet ",
        confirmButtonText:'Entendido'
      });
    });
  }
  click(){
    this.band==false?this.band=true:this.band=false;
  }
  update(id:any){
    this.router.navigate(['editarCompra',id]);
  }
  eliminar(id_compra:string){
    
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
