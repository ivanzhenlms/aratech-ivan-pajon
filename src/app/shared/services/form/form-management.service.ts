import { Injectable } from '@angular/core';
import { ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class FormManagementService {

  constructor() { }

  // Comprueba el estado de un validador para un campo en concreto
  public isValidatorValid(form: FormGroup, modelName: string, validatorName: string): boolean {
    let isValid = true;
    let fieldErrors: ValidationErrors = form.get(modelName).errors || null;
    if (fieldErrors) {
      Object.keys(fieldErrors).forEach(keyError => {
        if (keyError == validatorName) {
          isValid = false;
        }
      });
    }
    return isValid;
  }

  // Comprueba el estado de validación de un campo en concreto
  public isControlValid(form: FormGroup, modelName: string): boolean {
    let isValid = true;
    let fieldErrors: ValidationErrors = form.get(modelName).errors || null;
    if (fieldErrors) {
      isValid = false;
    }
    return isValid;
  }

  // Se obtiene el estado de formulario (Modificado, Tocado...) de un campo en concreto
  public getControlState(form: FormGroup, controlName: string, controlState: string): boolean {
    return form.controls[controlName][controlState];
  }
}
