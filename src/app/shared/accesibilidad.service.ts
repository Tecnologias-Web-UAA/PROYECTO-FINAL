import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccesibilidadService {
  usuario!:number;
  band:Boolean=true;
  font_size:number=20;
  font_h!:string;
  font_p!:string;
  comb:number=3;
  cont:Boolean=false;
  array!:Configuracion[];
  obj!:Configuracion;
  constructor() { 
    this.array = JSON.parse(localStorage.getItem('conf') || '[]');
    console.log("array: "+JSON.stringify(this.array));
  }
  guardarConf(){
      this.obj={
        'user':this.usuario,
        'font_size':this.font_size,
        'combinacion':this.comb,
        'gris':this.cont

      };

      if(this.array.findIndex(p=>p.user===this.usuario)!=-1){
        this.array[this.usuario]=this.obj;
      }else{
        if(this.usuario!=-1){
          this.array.push(this.obj);
        }
      }
      
      
      localStorage.setItem('conf',JSON.stringify(this.array));
  }
  recuperarConf(){
    if(this.array.findIndex(p=>p.user===this.usuario)!=-1){
      this.font_size=this.array[this.usuario].font_size;
      this.comb=this.array[this.usuario].combinacion;
      this.cont=this.array[this.usuario].gris;
      this.establecerFont();
    }else{
    }
  }
  aumentarFont():void{
    this.font_size++;
    this.guardarConf();
  }
  disminuirFont():void{
    this.font_size--;
    
    this.guardarConf();
  }
  establecerFont(){
    if(this.comb==1){
      this.font_h="Rowdies,cursive";
      this.font_p="Prompt,sans-serif";
     
    }else if(this.comb==2){
      this.font_h="Lobster, cursive";
      this.font_p="Cinzel,serif";
     
    }else if(this.comb==3){
      this.font_h="Anton,sans-serif";
      this.font_p="Noto Serif, serif";
     
    }
    
    this.guardarConf();
  }
  cambiarFont():void{
      (this.comb==1 || this.comb==2)?this.comb++:this.comb=1;
      this.establecerFont();    
    
        
   
  }  
  
  stop(event:any):void{
    event.stopPropagation();
  }
  escalaGris(){
   this.cont==false?this.cont=true:this.cont=false;   
   this.guardarConf();
  }
  changeBand(){
    this.band==true?this.band=false:this.band=true;
  }
}

 

export interface Configuracion{
  user:number;
  font_size:number;
  combinacion:number;
  gris:Boolean;


}