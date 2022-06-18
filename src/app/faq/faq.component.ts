import { Component, OnInit } from '@angular/core';
import { AccesibilidadService } from '../shared/accesibilidad.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent implements OnInit {
  costo_env:number=258.98;
  costo_ped:number=800;
  constructor(public accesibilidad:AccesibilidadService) { }

  ngOnInit(): void {
  }

}
