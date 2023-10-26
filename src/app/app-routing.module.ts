import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCustomerComponent } from './crud-customer/crud-customer.component';
import { LoginComponent } from './login/login.component'; // Reemplaza 'LoginComponent' con el nombre real de tu componente de inicio de sesión.
import { DescriptionComponent } from './description/description.component'; // Reemplaza 'DescriptionComponent' con el nombre real de tu componente de descripción.
// Definición de las rutas de la aplicación
const routes: Routes = [
  {
    path:'customer', // Ruta para la página de gestión de empleados
    component:CrudCustomerComponent // Asocia la ruta al componente CrudCustomerComponent
  },

  {
    path: 'description', // Nueva ruta para la página de descripción
    component: DescriptionComponent, // Asegúrate de importar DescriptionComponent
  },
  {
    path: 'login', // Nueva ruta para la página de inicio de sesión
    component: LoginComponent,
  },
  {
    path: '',// Ruta predeterminada (página de inicio)
    redirectTo:'/login',// Redirige a la página de inicio de sesión por defecto
    pathMatch:'full'// Redirección completa
  },
];
// Definición del módulo de enrutamiento
@NgModule({
  imports: [RouterModule.forRoot(routes)],// Configura las rutas en el módulo de enrutamiento
  exports: [RouterModule]// Exporta el módulo de enrutamiento para su uso en la aplicación
})
export class AppRoutingModule { }
