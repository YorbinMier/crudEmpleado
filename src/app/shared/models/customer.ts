interface IBaseEntity{ // Define una interfaz llamada 'IBaseEntity' con una propiedad 'id' de tipo número
      id:number;
}
// Define una interfaz llamada 'IBaseCustomer' que extiende IBaseEntity
export interface IBaseCustomer {
      // Propiedades relacionadas a los datos de un cliente
      Nombre:string;
      Apellido:string;
      FechaNacimiento:string;
      Telefono:string;
      Email:string;
      CuentaBanco:string;
}
// Define una interfaz llamada 'ICustomer' que extiende IBaseCustomer e IBaseEntity
export interface ICustomer extends IBaseCustomer, IBaseEntity{ }