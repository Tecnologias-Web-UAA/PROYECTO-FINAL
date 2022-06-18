import { Component, OnInit } from '@angular/core';
import { productos } from '../productos';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  misProd:any[]=productos;
  constructor() { }

  ngOnInit(): void {
  }

}
