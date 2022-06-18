import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit {

  @Input() band:Boolean=false;
  user:string='hola';
  constructor() { }

  ngOnInit(): void {
  }
  click(){
    this.band==false?this.band=true:this.band=false;
  }
  logOut(){

  }

}
