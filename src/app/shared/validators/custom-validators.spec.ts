import { FormControl } from '@angular/forms';
import { PhoneNumberValidator } from './custom-validators';
// Descripción de la suite de pruebas para PhoneNumberValidator
describe('PhoneNumberValidator', () => {
  // Prueba: debería devolver nulo si el valor del control es válido
  it('should return null if the control value is valid', () => {
    // Crea un nuevo control con un número de teléfono válido
    const control = new FormControl('+989353728642');
    // Obtiene la función validadora PhoneNumberValidator
    //  const validatorFn = PhoneNumberValidator('IR');
    const validatorFn = PhoneNumberValidator();
    // Ejecuta la función validadora en el control
    const result = validatorFn(control);
    // Comprueba si el resultado es nulo, lo que indica que el número es válido
    expect(result).toBeNull();
  });
  // Prueba: debería devolver un objeto de error si el valor del control es inválido
  it('should return an error object if the control value is invalid', () => {
    // Crea un nuevo control con un número de teléfono inválido
    const control = new FormControl('+999353728642');
    // Obtiene la función validadora PhoneNumberValidator
    //  const validatorFn = PhoneNumberValidator('IR');
    const validatorFn = PhoneNumberValidator();
    // Ejecuta la función validadora en el control
    const result = validatorFn(control);
    // Comprueba si el resultado es un objeto de error con la clave 'wrongNumber',
    // lo que indica que el número es inválido
    expect(result).toEqual({ 'wrongNumber': { value: control.value } });
  });

});
