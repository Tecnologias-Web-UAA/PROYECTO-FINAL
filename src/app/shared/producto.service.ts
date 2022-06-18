import { Injectable } from '@angular/core';
import { Producto } from '../producto.model';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  consultarRealProducto() {
    throw new Error('Method not implemented.');
  }
  products!: Observable<Producto[]>;
  productsRef!: AngularFirestoreCollection<Producto>;

  constructor(private firestore: AngularFirestore) { 
    this.products = this.firestore.collection<Producto>('producto').valueChanges();
    this.productsRef = this.firestore.collection('producto');
  }
  //Función para agregar un nuevo docuemnto
  addProduct(producto: Producto){
    const id = this.firestore.createId();
    const data = {id,...producto};
    this.productsRef.doc(id).set(data);
  }
  updateProduct(producto:Producto){
    
    this.firestore.collection('producto').doc(producto.id).update(producto);
  }
  getProducts(){
    return this.products;
  }
  getProduct(myid:string){
     this.firestore.collection('producto').doc(myid).get().subscribe(res=>console.log(res));
    return this.firestore.collection<Producto>('producto').doc(myid).valueChanges();
  }
  //Función para eliminar un documento existente.
  deleteProduct(producto: Producto){
    this.firestore.collection('producto').doc(producto.id).delete();
  }
}
