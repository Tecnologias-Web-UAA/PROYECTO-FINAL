import { Injectable } from '@angular/core';
import{HttpClient, HttpParams} from '@angular/common/http';
import { Compra } from '../modelos/compra.model';
import { Observable } from 'rxjs';
import { getPriority } from 'os';
@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  ruta:string ='https://electronica-halcon.herokuapp.com:'; 
  port:string="";
  constructor(private http: HttpClient) { 
    
  }

  altas(compra:any,path:string):Observable<any>{
    return this.http.post(`${this.ruta}/${path}`,compra,{responseType: 'text'});
    //opciones que puede llevar el responseType(respuesta que envia node)
    //->json (the default)
    //->text
    //->arraybuffer
    //->blob
  }

  consultaTodo(path:string,coleccion:string){
    let params = new HttpParams().set('coleccion', coleccion);
    return this.http.get(`${this.ruta}/${path}/${coleccion}`);
  }

  consultaUno(path:string){
    return this.http.get(`${this.ruta}/${path}`);
  }
  eliminar(path:string){
    // let params = new HttpParams().set('id', id);
    return this.http.get(`${this.ruta}/${path}`,{responseType: 'text'});
  }
  actualizar(path:string,obj:any){
    return this.http.post(`${this.ruta}/${path}`,obj,{responseType: 'text'});
    
  }


  qrangular(id:any){
    return this.http.get(`${this.ruta}/consultarqr/${id}`);
  }

  comprarProducto(id:any){
    return this.http.get(`${this.ruta}/comprarProducto/${id}`);
  }

  consultarProductoID(id:any){
    return this.http.get(`${this.ruta}/QRProductoID/${id}`);
  }


}
