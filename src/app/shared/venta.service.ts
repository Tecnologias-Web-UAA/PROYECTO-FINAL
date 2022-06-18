import { Injectable } from '@angular/core';
import { Ventas } from '../modelos/ventas.model';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../producto.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  consultarRealVenta() {
    throw new Error('Method not implemented.');
  }
  ventas!: Observable<Ventas[]>;
  ventasRef!: AngularFirestoreCollection<Ventas>;

  constructor(private firestore: AngularFirestore) { 
    this.ventas = this.firestore.collection<Ventas>('ventas').valueChanges();
    this.ventasRef = this.firestore.collection('ventas');
  }
  //Función para agregar un nuevo docuemnto
  addVenta( venta: Ventas){
    const id = this.firestore.createId();
    const data = {id,...venta};
    this.ventasRef.doc(id).set(data);
  }
  updateVenta(producto:Ventas){
    
    this.firestore.collection('ventas').doc(producto.id).update(producto);
  }
  getVentas(){
    return this.ventas;
  }
  getVenta(myid:string){
     this.firestore.collection('ventas').doc(myid).get().subscribe(res=>console.log(res));
    return this.firestore.collection<Ventas>('producto').doc(myid).valueChanges();
  }
  //Función para eliminar un documento existente.
  deleteVenta(venta: Ventas){
    this.firestore.collection('ventas').doc(venta.id).delete();
  }

}
