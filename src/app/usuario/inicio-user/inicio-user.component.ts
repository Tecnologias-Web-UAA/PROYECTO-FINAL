import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-inicio-user',
  templateUrl: './inicio-user.component.html',
  styleUrls: ['./inicio-user.component.scss']
})
export class InicioUserComponent implements OnInit {

  band:Boolean=false;
  user!:any;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
   this.getEmail();
  //  this.router.navigate(['/altas']);
  }
  click(){
    this.band==false?this.band=true:this.band=false;
  }
  logOut(){
    this.auth.signOut();
  }
  getEmail(){
    this.auth.getUserLogged().subscribe(res=>{
      this.user = res?.email;
    }); 
  }

}
