import { Component } from '@angular/core';// Importa el decorador 'Component' desde '@angular/core'
import { Router } from '@angular/router';// Importa el servicio 'Router' desde '@angular/router'


@Component({
   // Define las propiedades del componente
  selector: 'app-login', // Selector de etiqueta HTML para este componente
  templateUrl: './login.component.html',// Plantilla HTML asociada al componente
  styleUrls: ['./login.component.css']// Estilos CSS asociados al componente
})
export class LoginComponent {
  // Declaración de variables para almacenar el nombre de usuario, contraseña y mensajes de error
  username: string = '';
  password: string = '';
  message: string = ''; // Para mostrar mensajes de error

  // Constructor del componente, inyecta el servicio 'Router'
  constructor(private router: Router) {} // Inyecta el servicio Router

  
  
  // Método para realizar el proceso de inicio de sesión
  login() {
    // Verifica el usuario y contraseña
    if (this.username === 'Admin' && this.password === '123456') {
      // Autenticación exitosa, redirige a la página de "customer"
      this.router.navigate(['/description']); // Redirección a la página "customer"
      //window.location.href = 'app/description/description.html'; // Reemplaza 'ruta-de-tu-description.html' con la URL correcta de tu página description.html
    } else {
      // Muestra un mensaje de error
      this.message = 'Usuario y contraseña incorrectos';
    }
  }
}
