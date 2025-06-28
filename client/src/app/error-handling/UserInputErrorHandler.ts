import {
  FormControl, Validators, FormsModule, ReactiveFormsModule,
  AbstractControl, ValidationErrors, ValidatorFn
} from '@angular/forms';


export function zipCodeValidator(): ValidatorFn {
    return (formControl: AbstractControl): ValidationErrors | null => {
        const isValid = /^\d{5}(-\d{4})?$/.test(formControl.value);  // simple regex to validate U.S. zip codes
        return isValid ? null : { invalidZipCode: true };
    };
}

export function getFormControlErrorMessage(formControl: FormControl): string | null {
    // generic enough to add more case statements for other formcontrols
    let errorMessage: string | null = null;

    switch (formControl !== null && formControl !== undefined) {
        case formControl.hasError('required'):
            errorMessage = 'Zip code is required';
            break;
        case formControl.hasError('invalidZipCode'):
            errorMessage = 'Please enter a valid United States zip code.';
            break;
        default:
            errorMessage = null;
    }
    return errorMessage;
}
