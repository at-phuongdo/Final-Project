import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { AbstractControl } from '@angular/forms';
import { PasswordValidation } from './password-validation';

function passwordConfirming(c: AbstractControl) {
  if (c.get('password').value === c.get('password_confirm').value) {
    return {areEqual: true};
  }
  else 
    return null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  registerForm: any;
  status: any;
  info: any;
  user_firstname: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private router: Router,
    private toasterService: ToasterService
  ) {
    this.registerForm = this._fb.group({
      firstname: new FormControl('', [Validators.required,Validators.maxLength(20)] ),
      lastname: new FormControl('', [Validators.required,Validators.maxLength(20)] ),
      email: new FormControl('', [Validators.required,  Validators.pattern("[^ @]*@[^ @]*")]),
      password: new FormControl('', [Validators.required, 
                                    Validators.minLength(6), 
                                    Validators.maxLength(20),
                                  ]),
      password_confirm: new FormControl('')
      },
      {validator: PasswordValidation.MatchPassword});
  }

  ngOnInit() {
  }

  register(user) {
    console.log(user);
    if (user.password === user.password_confirm) {
      this.userService.registerUser(user).subscribe(
        data => {
          this.status = data.status;
          if (this.status === 'created') {
            this.toasterService.pop('success', 'Success! Please check you email to active your account!');
          }
          else
            this.toasterService.pop('warning', 'Try again');
        },
        error => {
          console.error("Error");
          return Observable.throw(error);
        }
      );
    }
  }
}

