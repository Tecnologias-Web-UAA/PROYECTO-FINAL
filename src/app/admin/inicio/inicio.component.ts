import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  band:Boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  click(){
    this.band==false?this.band=true:this.band=false;
  }
}
