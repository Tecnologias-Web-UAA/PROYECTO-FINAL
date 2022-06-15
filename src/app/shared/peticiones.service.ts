import { Injectable } from '@angular/core';
import{HttpClient, HttpParams} from '@angular/common/http';
import { Compra } from '../modelos/compra.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  ruta:string ='http://localhost:3000'; 
  constructor(private http: HttpClient) { }

  altas(compra:Compra,path:string):Observable<any>{
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

  qrangular(id:any){
    return this.http.get(`${this.ruta}/consultarqr/${id}`);
  }

}
