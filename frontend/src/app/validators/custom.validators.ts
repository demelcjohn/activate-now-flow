import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const value = control.value.toString().trim();

    // Pattern: either 10 digits or +91 followed by 10 digits
    const phonePattern = /^(?:\d{10}|\+91\d{10})$/;

    if (phonePattern.test(value)) {
      return null;
    }

    return { invalidPhone: true };
  };
}
