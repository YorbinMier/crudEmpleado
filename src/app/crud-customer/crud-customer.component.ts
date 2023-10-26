// Importa ChangeDetectionStrategy y Component del módulo '@angular/core'
import { ChangeDetectionStrategy, Component } from '@angular/core';
// Importa la interfaz ICustomer del módulo 'customer' en la carpeta '../shared/models/customer'
import { ICustomer } from '../shared/models/customer';
// Importa la clase StorageService del módulo 'storage.service' en la carpeta '../shared/services'
import { StorageService } from '../shared/services/storage.service';
// Importa la clase Router del módulo '@angular/router'
import { Router } from '@angular/router'; 
// Importa la función 'map' del módulo 'rxjs/operators'
import { map } from 'rxjs/operators';

// Define un nuevo componente Angular
@Component({
  selector: 'app-crud-customer',// Selector del componente
  templateUrl: './crud-customer.component.html',// Ruta del archivo HTML que define la vista del componente
  styleUrls: ['./crud-customer.component.css'],// Rutas de los archivos CSS para el estilo del componente
  changeDetection: ChangeDetectionStrategy.OnPush// Estrategia de detección de cambios
})
export class CrudCustomerComponent  {
  // Declara una propiedad 'customerList$' que almacena un observable de la lista de clientes
  customerList$ = this.storageService.getCustomer$;
  // Declara una propiedad '_openDialog' para controlar si un cuadro de diálogo está abierto o cerrado
  _openDialog = false;

  // Define un setter para la propiedad 'openDialog' para manejar la apertura y cierre del cuadro de diálogo
  set openDialog(value: boolean){
    if (!value) {
      this.customer = null;// Si se cierra el cuadro de diálogo, establece 'this.customer' a null
    }
    this._openDialog = value;// Actualiza el estado del cuadro de diálogo
  }

  // Define un getter para la propiedad 'openDialog' para obtener el estado del cuadro de diálogo
  get openDialog(){
    return this._openDialog;
  }

  // Declara una propiedad 'customer' para almacenar un objeto de cliente o null
  customer: ICustomer | null = null;

   // Declara una propiedad 'searchTerm' para almacenar el término de búsqueda
  searchTerm: string = ''; 
  // Constructor del componente que recibe instancias de 'StorageService' y 'Router'
  constructor(private storageService:StorageService,private router: Router) { }

  // Método para eliminar un cliente
  deleteItem(customer: ICustomer){
    this.storageService.deleteItem(customer);
  }

  // Método para editar un cliente
  editItem(customer: ICustomer){
    this.customer = customer;
    this.openDialog = true;
  }

  // Método para navegar a una ruta
  navigateTo(route: string) {
    // Utiliza el método navigate para redirigir a la ruta deseada
    this.router.navigate([route]);
  }

  // Método para realizar una búsqueda de clientes
  search() {
    if (this.searchTerm) {
        // Utilizamos un observable filter para mostrar los resultados en tiempo real
        this.customerList$ = this.storageService.getCustomer$.pipe(
          // Utiliza el operador 'map' para transformar los datos del observable
            map(customers => customers.filter(customer =>
              // Comprueba si el 'id' del cliente convertido a cadena es igual al término de búsqueda
                customer.id.toString() === this.searchTerm ||
                customer.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                customer.Apellido.toLowerCase().includes(this.searchTerm.toLowerCase()))
            )
        );
    } else {
        // Cuando el término de búsqueda esté vacío, mostramos todos los clientes
        this.customerList$ = this.storageService.getCustomer$;
    }
}

}
