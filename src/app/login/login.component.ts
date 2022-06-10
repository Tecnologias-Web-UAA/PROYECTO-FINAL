import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccesibilidadService } from '../shared/accesibilidad.service';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm!:FormGroup;
  constructor(private auth:AuthService,private accesibilidad:AccesibilidadService,private router:Router) {
    this.myForm=new FormGroup({
      'correo':new FormControl('',[Validators.required,Validators.email]),
      'contrasena':new FormControl('',[Validators.required,Validators.minLength(7)])
    });
    
   }

  ngOnInit(): void {
  }
  logIn(){
    let {correo,contrasena}=this.myForm.value;
    this.auth.signIn(correo,contrasena).then((res)=>{
      if(res){
      this.accesibilidad.changeBand();
      this.router.navigate(['/inicioAdmin']);
      }
    });
  }
}
