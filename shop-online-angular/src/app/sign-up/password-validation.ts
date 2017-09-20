import {AbstractControl} from '@angular/forms';
export class PasswordValidation {
    static MatchPassword(_ac: AbstractControl) {
       let password = _ac.get('password').value;
       let confirmPassword = _ac.get('password_confirm').value;
        if(password != confirmPassword) {
            console.log('false');
            _ac.get('password_confirm').setErrors( {"MatchPassword": true} )
        } else {
            console.log('true');
            return null
        }
    }
}