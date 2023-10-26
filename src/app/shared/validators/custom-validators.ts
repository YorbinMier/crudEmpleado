import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PhoneNumberUtil } from "google-libphonenumber";

// Crea una instancia de la utilidad PhoneNumberUtil de la librería google-libphonenumber
const phoneNumberUtil = PhoneNumberUtil.getInstance();

// export function PhoneNumberValidator(regionCode: string): ValidatorFn {
//   return (control: AbstractControl) => {
//     let validNumber = false;
//     try {
//       const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
//         control.value, regionCode
//       );
//       validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
//     } catch (e) { }
//     return validNumber ? null : { 'wrongNumber': { value: control.value } };
//   }
// }

// Definición de la función validadora PhoneNumberValidator
export function PhoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    let validNumber = false;
    try {
      // Intenta analizar el valor del control como un número de teléfono
      const parsedNumber = phoneNumberUtil.parse(control.value);
      // Verifica si el número de teléfono analizado es válido
      validNumber = phoneNumberUtil.isValidNumber(parsedNumber);
    } catch (e) { }
    // Devuelve nulo si el número de teléfono es válido, de lo contrario, devuelve un error 'wrongNumber'
    return validNumber ? null : { 'wrongNumber': { value: control.value } };
  };
}