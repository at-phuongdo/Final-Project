import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: any;
  errors: any;

  constructor(
    private userService: UserService,
    private _fb: FormBuilder
  ) {
    this.resetPasswordForm = this._fb.group({
      email: new FormControl('')
    });
   }

  ngOnInit() {
  }

  resetPassword(user){
    this.userService.resetPassword(user).subscribe(data => {
        this.errors = data.message;
      },
      error => {
        return Observable.throw(error);
      }
    );
  }

}
