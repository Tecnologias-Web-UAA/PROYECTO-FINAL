import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  user!:any;
  band:Boolean=false;
  img:any="assets/img/undraw_profile.svg";
  @Output() emitBand=new EventEmitter<Boolean>();
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.getEmail();
  }
  logOut(){
    this.auth.signOut();
  }
  click(){
    this.band==false?this.band=true:this.band=false;
    this.emitBand.emit(this.band);
  }
  getEmail(){
    this.auth.getUserLogged().subscribe(res=>{
      this.user = res?.email,
      this.img  = res?.photoURL 
      if(this.img!=undefined){

      }else{
        this.img="assets/img/undraw_profile.svg";
      }
    }); 
  }
}
