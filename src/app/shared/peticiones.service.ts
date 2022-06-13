import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Compra } from '../modelos/compra.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  ruta:string ='http://localhost:3000'; 
  constructor(private http: HttpClient) { }

  altas(compra:Compra):Observable<any>{
    return this.http.post(`${this.ruta}/altaCompra`,compra,{responseType: 'text'});
  }
}
