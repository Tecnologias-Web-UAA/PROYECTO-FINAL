import { Component, OnInit } from '@angular/core';
import { User } from '@firebase/auth';
import { PeticionesService } from 'src/app/shared/peticiones.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-consulta-users',
  templateUrl: './consulta-users.component.html',
  styleUrls: ['./consulta-users.component.scss']
})
export class ConsultaUsersComponent implements OnInit {
  band:boolean=false;
  users:any[]=[];
  constructor(private peticiones:PeticionesService) { }

  ngOnInit(): void {
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    this.peticiones.consultaTodo('consultaTodo','usuario').subscribe((res:any)=>{
      this.users=res.myarray;
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
}
