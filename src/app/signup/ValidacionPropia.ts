import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

export class ValidacionPropia {
    static contrasenasIguales(control: AbstractControl): ValidationErrors| null {
        let contrasena1=control.get('contrasena');
        let contrasena2=control.get('contrasena2');
        
        return contrasena1?.value === contrasena2?.value
        ? null
        : { noSonIguales: true }
    }
}
