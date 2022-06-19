import { Component, OnInit } from '@angular/core';
import { Ventas } from '../../modelos/ventas.model';
import { PeticionesService } from '../../shared/peticiones.service';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-compras-hechas',
  templateUrl: './compras-hechas.component.html',
  styleUrls: ['./compras-hechas.component.scss']
})
export class ComprasHechasComponent implements OnInit {
  band:boolean = false;
  comprasHechas:Ventas[]=[];
  compras:Ventas[]=[];
  id_doc!:any;
  gasto:number=0;
  correo!:string;
  saldo:number = 0;

  constructor(private peticionesService:PeticionesService, private authService:AuthService) { 
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    this.peticionesService.consultaTodo('consultaTodo','ventas').subscribe((res:any)=>{
      this.compras = res.myarray;
      this.id_doc = res.myids;
      console.log('Ventas Coleccion',this.compras);
      this.authService.getUserLogged().subscribe((res:any)=>{
        this.correo = res.email; 
        console.log('Correo',this.correo);
        for(let i = 0; i < this.compras.length; i++){
          if(this.correo == this.compras[i].correoUsario){
            this.comprasHechas.push(this.compras[i]);
            this.saldo += this.compras[i].costo;
          }
        }
        console.log('Compras Usuario',this.comprasHechas);
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

  ngOnInit(): void {
  }

  click(){
    this.band==false?this.band=true:this.band=false;
  }

}
