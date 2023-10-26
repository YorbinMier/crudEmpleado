import { Component } from '@angular/core'; // Importa el decorador 'Component' desde '@angular/core'
import { Router } from '@angular/router'; // Importa el servicio 'Router' desde '@angular/router'

@Component({
  // Define las propiedades del componente
  selector: 'app-description', // Selector de etiqueta HTML para este componente
  templateUrl: './description.component.html', // Plantilla HTML asociada al componente
  styleUrls: ['./description.component.css'] // Estilos CSS asociados al componente
})
export class DescriptionComponent {
  constructor(private router: Router,) {} // Constructor del componente, inyecta el servicio 'Router'

  // Método para navegar a una ruta específica
  navigateTo(route: string) {
    // Utiliza el método 'navigate' del servicio 'Router' para redirigir a la ruta deseada
    this.router.navigate([route]);
  }
}
