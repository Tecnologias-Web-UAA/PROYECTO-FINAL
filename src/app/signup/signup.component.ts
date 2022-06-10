import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  myForm!:FormGroup;
 
  constructor(private auth:AuthService) { 
    this.myForm=new FormGroup({
      'correo':new FormControl('',[Validators.required,Validators.email]),
      'contrasena':new FormControl('',[Validators.required,Validators.minLength(7)]),
      'check':new FormControl('')


    });
  }

  ngOnInit(): void {
  }
  registrar(){
   
    console.log(this.myForm.value);
    let {correo,contrasena}=this.myForm.value;
    this.auth.signUp(correo,contrasena).then((res)=>{
      console.log("registrado exitosamente");
    });
  }

}
