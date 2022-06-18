import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import swal from 'sweetalert2';
import { PeticionesService } from 'src/app/shared/peticiones.service';

@Component({
  selector: 'app-grafica-existencias-prod',
  templateUrl: './grafica-existencias-prod.component.html',
  styleUrls: ['./grafica-existencias-prod.component.scss']
})
export class GraficaExistenciasProdComponent implements OnInit {

  //Tipo de grafico que se va a ejecutar
  barChartType: ChartType = 'bar';
  ancho = 3;
  radius = 8;
  producto:any;
  id_doc:any;
  
  barChartData: ChartDataset[] = [];

  barChartLabels: string[] = ['Productos Existentes'];

  //Para que sea responsivo y adaptable para un celular
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {//titulo de la grafica
        display: true,
        text: 'Grafica Existencia De Los Producto',
        font: {
          family: 'Impact',
          size: 40,
        },
        color: 'rgb(105, 7, 7)'
      },
      legend: {//los simbolos de lo que es cada color de la grafica
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 15,
            family: 'Consolas',
          },
          color: 'black'
        },
        position: 'bottom', 
      }
    },
    scales: {//para el diseño de los ejes de la grafica
      y: {
          ticks: {//los valore del eje y
            color: 'rgb(72, 0, 75)',
            font: {
              size: 18,
              family: 'Alegrian',
              weight: 'bold'
            }
          },
          title: {
            display: true, //debe de estar en true para que aparezca el titulo
            text:'Cantidad de productos',
            color: 'rgb(72, 72, 72)',
            font: {
              family: 'Verbana',
              size: 18,
              weight: 'bold'
            }
          }
      },
      x: {
        title: {
          display: true,
          text: 'Productos',
          font: {
            family: 'Verbana',
            size: 18,
            weight: 'bold'
          },
          color: 'rgb(72, 72, 72)'
        },
        ticks: {//los valore del eje x
          color: 'rgb(72, 0, 75)',
          font: {
            size: 18,
            family: 'Alegrian',
            weight: 'bold'
          }
        },
      },
      
    }
  };
  //Para que se puedan ver las leyendas
  barChartLegend = true;
  //Este abierta a plugins para mejorar el grafico
  barChartPlugins = [];

  band:boolean=false;
  constructor(private peticionesServicio:PeticionesService) {
    this.recuperarDatos();
  }

  ngOnInit(): void {
  }

  click(){
    this.band==false?this.band=true:this.band=false;
  }

  recuperarDatos(){
    swal.fire({
      allowOutsideClick: false,
      title: "Cargando...",
      text: "Espere por favor",
    });
    swal.showLoading();
    this.peticionesServicio.consultaTodo('consultaTodo','producto').subscribe((res:any)=>{
      this.producto = res.myarray;
      this.id_doc = res.myids;

      /* console.log(this.barChartData);
      console.log(this.barChartLabels); */
      
      swal.close();
      for(let i=0; i < this.producto.length; i++){
        this.barChartData.push({ data: [this.producto[i].cantidad], label: `${this.producto[i].nombre}`, backgroundColor:`rgba(${Math.round(Math.random() * (255 - 0) + 0)}, ${Math.round(Math.random() * (252 - 0) + 0)}, ${Math.round(Math.random() * (255 - 0) + 0)}, 0.69)`, borderColor: `rgb(${Math.round(Math.random() * (255 - 0) + 0)}, ${Math.round(Math.random() * (252 - 0) + 0)}, ${Math.round(Math.random() * (252 - 0) + 0)})`, borderWidth: this.ancho, type: this.barChartType, borderRadius: this.radius});
      }
      console.log('Listo'); 
    },err=>{
      swal.close();
      swal.fire({
        allowOutsideClick: true,
        title: "Error...",
        text: "Algo salio mal...Intenta de nuevo ",
        confirmButtonText:'Entendido'
      });
    });
  }

}
