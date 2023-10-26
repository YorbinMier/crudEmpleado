// Importaciones de módulos y clases necesarias
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, of, startWith } from 'rxjs';
import { IBaseCustomer, ICustomer } from '../shared/models/customer';
import { StorageService, StorageStatus } from '../shared/services/storage.service';
import { PhoneNumberValidator } from '../shared/validators/custom-validators';

@Component({
  selector: 'app-customer-dialog',// Selector del componente
  templateUrl: './customer-dialog.component.html', // Ruta del archivo HTML que define la vista del componente
  styleUrls: ['./customer-dialog.component.css'], // Rutas de los archivos CSS para el estilo del componente
  changeDetection: ChangeDetectionStrategy.OnPush // Estrategia de detección de cambios
})
export class CustomerDialogComponent implements OnInit, AfterViewInit {
  // Definición de un componente Angular llamado 'CustomerDialogComponent'

  // Evento de salida que emite cuando se cierra el cuadro de diálogo, pasando un objeto de cliente o nulo
  @Output() dialogClosed = new EventEmitter<ICustomer | null>();
  // Entrada que recibe un objeto de cliente o nulo
  @Input() customer: ICustomer | null = null;
  // @ViewChild('firstnameInput') firstnameInput!:ElementRef<HTMLInputElement>;

  // Formulario de cliente con campos y validadores
  customerForm = new FormGroup({
    // Campo 'Nombre' del formulario
    Nombre: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[a-z0-9\u0627-\u06cc]{3,32}$/i)]),
    Apellido: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[a-z0-9\u0627-\u06cc]{3,32}$/i)]),
    FechaNacimiento: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[1-4]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/)]),
    // phoneNumber:new FormControl({ value: '', disabled: false }, [PhoneNumberValidator('IR')]),
    Telefono: new FormControl({ value: '', disabled: false }, [PhoneNumberValidator()]),
    Email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
    CuentaBanco: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)]),
  });

  // Constructor del componente que recibe una instancia de 'StorageService'
  constructor(
    private storageService: StorageService
  ) {
  }

  ngAfterViewInit(): void {
    // this.firstnameInput.nativeElement.focus(); 
    // Método de ciclo de vida que se ejecuta después de que la vista se haya inicializado
    // En este caso, se usaba para enfocar un campo de entrada, pero está comentado 
  }
  // Observable que se inicializa con 'false'
  formgropChanged$ = of(false);
  ngOnInit() {
    // Método de ciclo de vida que se ejecuta cuando se inicializa el componente
    if (this.customer) {
      // Si se proporciona un cliente al componente, inicializa el formulario con los datos del cliente
      const formInit = {
        Nombre: this.customer.Nombre,// Inicializa el campo 'Nombre' con el valor del cliente
        Apellido: this.customer.Apellido,// Inicializa el campo 'Apellido' con el valor del cliente
        FechaNacimiento: this.customer.FechaNacimiento,
        Telefono: this.customer.Telefono,
        Email: this.customer.Email,
        CuentaBanco: this.customer.CuentaBanco,
      };
      // Establece los valores iniciales del formulario 'customerForm' con los valores de 'formInit'
      this.customerForm.setValue(formInit);
      // Creación de un flujo de observación para rastrear cambios en el formulario y compararlos con los valores iniciales
      this.formgropChanged$ = this.customerForm.valueChanges.pipe(
        startWith(formInit),// Inicia con los valores iniciales
        map((value) => (JSON.stringify(value) == JSON.stringify(formInit)) ? true : false),// Compara los valores actuales con los valores iniciales
      );
    }
  }

  @HostListener('document:keyup.escape')
  closeDialog() {
    // Manejador de eventos que se ejecuta cuando se presiona la tecla "Esc" en el documento
    this.dialogClosed.emit(this.customer);
    this.customerForm.reset();
    this.customer = null;
  }

  @HostListener('document:keyup.enter')
  submit() {
     // Manejador de eventos que se ejecuta cuando se presiona la tecla "Enter" en el documento
    if (this.customerForm.invalid) {
      return;
    }
    const trimedValue: IBaseCustomer = {
      // Crea un objeto 'IBaseCustomer' con datos del formulario después de recortar los espacios en blanco
      Nombre: this.customerForm.value.Nombre.trim(),// Campo 'Nombre' del objeto 'trimedValue' con espacios en blanco recortados
      Apellido: this.customerForm.value.Apellido.trim(),// Campo 'Apellido' del objeto 'trimedValue' con espacios en blanco recortados
      FechaNacimiento: this.customerForm.value.FechaNacimiento.trim(),
      Telefono: this.customerForm.value.Telefono.trim(),
      Email: this.customerForm.value.Email.trim(),
      CuentaBanco: this.customerForm.value.CuentaBanco.trim(),
    };
    // Inicialización de la variable 'status' con el valor de éxito 'StorageStatus.SUCCESS'
    let status = StorageStatus.SUCCESS;
    if (this.customer) {
      // Si ya existe un cliente, intenta editar el cliente utilizando 'StorageService'
      status = this.storageService.editItem({ ...trimedValue, id: this.customer.id });
    } else {
       // Si no existe un cliente, intenta agregar uno nuevo utilizando 'StorageService'
      status = this.storageService.addItem(trimedValue);
    }
    switch (status) {
      // Realiza una serie de acciones según el resultado de la operación
      case StorageStatus.PERSONEXISTS:
        // Si ya existe una persona con el mismo nombre y apellido, muestra un error en el campo 'Nombre'
        this.customerForm.controls['Nombre'].setErrors({ 'incorrect': true });
        break;

      case StorageStatus.EMAILEXISTS:
        // Si ya existe una persona con el mismo correo electrónico, muestra un error en el campo 'Email'
        this.customerForm.controls['Email'].setErrors({ 'incorrect': true });
        break;

      default:
        // Si la operación tiene éxito, cierra el cuadro de diálogo
        this.closeDialog();
        break;
    }

  }

}
