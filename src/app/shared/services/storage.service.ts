import { Injectable } from '@angular/core'; // Importa el decorador 'Injectable' desde '@angular/core'
import { BehaviorSubject, Observable, filter } from 'rxjs'; // Importa objetos y enumeraciones desde RxJS
import { IBaseCustomer, ICustomer } from '../models/customer'; // Importa las interfaces 'IBaseCustomer' e 'ICustomer' desde un archivo de modelos

// Define una enumeración 'StorageStatus' para representar diferentes estados de almacenamiento
export enum StorageStatus {
  SUCCESS = 0,
  EMAILEXISTS = 5,
  PERSONEXISTS = 123
}

@Injectable({
  providedIn: 'root' // Registra el servicio como un servicio raíz
})
export class StorageService {
  // Arreglo para almacenar clientes
  store:ICustomer[] = [];
  // Fuente observable para los clientes
  private customerSource = new BehaviorSubject<ICustomer[]>(<any>null);
  // Observable público para los clientes
  getCustomer$: Observable<ICustomer[]> = this.customerSource.asObservable().pipe(
    filter(x => x != null)
  );
  // Método para establecer la fuente observable de clientes
  private setCustomer(customers: ICustomer[]) {
    this.customerSource.next(customers); 
  }
  // Constructor del servicio
  constructor(){
    this.getStorage() // Inicializa el servicio y carga los datos de almacenamiento
  }
  // Método para agregar un nuevo cliente
  addItem(item: IBaseCustomer){
    // Verifica si el email ya existe
    if (this.emailExistence(item)) {
      return StorageStatus.EMAILEXISTS;
    }
    // Verifica si la persona ya existe
    if (this.personExistence(item)) {
      return StorageStatus.PERSONEXISTS;
    }
    // Genera un nuevo ID para el cliente
    let autoGenerateId = 1;
    if (this.store.length) {
      autoGenerateId = this.store[this.store.length - 1].id + 1;
    }
    // Agrega el nuevo cliente al arreglo
    this.store.push({...item, id:autoGenerateId});
    // Actualiza el estado
    this.updateState(this.store);
    return StorageStatus.SUCCESS;
  }
  // Método para editar un cliente existente
  editItem(item: ICustomer){
    // Verifica si el email ya existe (en modo de edición)
    if (this.emailExistence(item, true)) {
      return StorageStatus.EMAILEXISTS;
    }
     // Verifica si la persona ya existe (en modo de edición)
    if (this.personExistence(item, true)) {
      return StorageStatus.PERSONEXISTS;
    }
    // Encuentra el cliente en el arreglo y lo actualiza
    const index = this.store.findIndex(customer => customer.id === item.id);
    this.store[index] = item;
    // Actualiza el estado
    this.updateState(this.store);
    return StorageStatus.SUCCESS;
  }
  // Método para eliminar un cliente
  deleteItem(item: ICustomer){
    // Filtra y remueve el cliente del arreglo
    this.store = this.store.filter(customer => customer.id != item.id);
    // Actualiza el estado
    this.updateState(this.store);
  }
  // Método para verificar la existencia de un email
  // in edit mode we should not compare itself with itself so we are using a boolean proprety named exceptItself
  emailExistence(item: ICustomer | IBaseCustomer, exceptItself = false){
    // Verifica si el email ya existe en el arreglo
    // @ts-ignore: if we come from addItem so we have IBaseCustomer which does not has id but instead !exceptItself is true and item.id will not execute
    const index = this.store.findIndex(customer => (!exceptItself || customer.id != item.id) && customer.Email.toLowerCase() === item.Email.toLowerCase());
    // Verifica si un cliente con el mismo correo electrónico ya existe en el arreglo 'store'
    // Si 'index' es mayor que -1, significa que se encontró un cliente con el mismo correo
    return (index > -1);
  }
  // Método para verificar la existencia de una persona (nombre, apellido y fecha de nacimiento)
  // in edit mode we should not compare itself with itself so we are using a boolean proprety named exceptItself
  personExistence(item: ICustomer | IBaseCustomer, exceptItself = false){
    // Crea una cadena combinada de nombre, apellido y fecha de nacimiento
    const checkExistence = (item.Nombre + item.Apellido + item.FechaNacimiento).toLowerCase();
    // Verifica si la persona ya existe en el arreglo
    // @ts-ignore: if we come from addItem so we have IBaseCustomer which does not has id but instead !exceptItself is true and item.id will not execute
    const index = this.store.findIndex(customer => (!exceptItself || customer.id != item.id) && ((customer.Nombre + customer.Apellido + customer.FechaNacimiento).toLowerCase() === checkExistence));
    return (index > -1);
  }
  // Método para obtener datos de almacenamiento desde localStorage
  getStorage(){
    // Recupera los datos almacenados en 'customers' desde el almacenamiento local (localStorage)
    const temp = localStorage.getItem('customers');
    if(temp){
      // Si se encuentran datos en el almacenamiento local, analízalos y asigna al arreglo 'store'
      this.store = JSON.parse(temp);
    }
    // Llama al método 'setCustomer' para actualizar la fuente observable con los datos recuperados
    this.setCustomer(this.store);
  }
  // Método para actualizar el estado y guardar datos en localStorage
  updateState(modified: ICustomer[]){
    // Convierte el arreglo 'modified' a formato JSON y lo almacena en 'customers' en el almacenamiento local
    localStorage.setItem('customers', JSON.stringify(modified));
    // Llama al método 'setCustomer' para actualizar la fuente observable con los datos modificados
    this.setCustomer(modified);
  }

  

}
