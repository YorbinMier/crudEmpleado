import { AfterViewInit, Directive, ElementRef } from '@angular/core';// Importa los módulos necesarios desde '@angular/core'

// Define una directiva personalizada llamada 'AutoFocusDirective'
@Directive({
  selector: '[appAutoFocus]'// Selector de la directiva (se aplicará a elementos con el atributo 'appAutoFocus')
})
export class AutoFocusDirective implements AfterViewInit{
// Constructor de la directiva, inyecta el servicio 'ElementRef'
  constructor(
    private elementRef: ElementRef
  ) { }
// Método implementado de la interfaz 'AfterViewInit'
  ngAfterViewInit(): void {
    // Cuando la vista se ha inicializado, se enfoca en el elemento HTML asociado a esta directiva
    this.elementRef.nativeElement.focus();
  }

}
