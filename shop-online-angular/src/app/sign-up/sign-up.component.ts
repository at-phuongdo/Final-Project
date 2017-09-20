import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { PasswordValidation } from './password-validation';

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
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
      password_confirm: []
    },
      {
        validator: PasswordValidation.MatchPassword
      });
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
            this.info = 'Please check you email to active your account!';
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

