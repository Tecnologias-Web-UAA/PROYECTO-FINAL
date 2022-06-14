import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent implements OnInit {
  costo_env:number=258.98;
  costo_ped:number=800;
  constructor() { }

  ngOnInit(): void {
  }

}
