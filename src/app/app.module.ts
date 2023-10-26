import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CrudCustomerComponent } from './crud-customer/crud-customer.component';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DescriptionComponent } from './description/description.component';
import { AutoFocusDirective } from './shared/directives/auto-focus.directive';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,// Declaración del componente raíz de la aplicación
    CrudCustomerComponent,// Declaración del componente de gestión de clientes
    CustomerDialogComponent,// Declaración del componente de diálogo de clientes
    DescriptionComponent,// Declaración del componente de descripción
    AutoFocusDirective,// Declaración de la directiva de enfoque automático
    LoginComponent// Declaración del componente de inicio de sesión
  ],
  imports: [
    
    FormsModule,// Importa el módulo FormsModule para trabajar con formularios en plantillas
    BrowserModule,// Importa el módulo BrowserModule para la aplicación web
    AppRoutingModule,// Importa el módulo de enrutamiento de la aplicación
    ReactiveFormsModule,// Importa el módulo ReactiveFormsModule para formularios reactivos
    
  ],
  providers: [],// Proveedores de servicios (puede añadirse aquí)
  bootstrap: [AppComponent]// Componente raíz de la aplicación
})
export class AppModule { }// Definición del módulo principal de la aplicación
