import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: any;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this.registerForm = this._fb.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      password_confirm: new FormControl('')
    });
   }

  ngOnInit() {
  }

  register(user) {
    this.userService.registerUser(user).subscribe(
      data => {
        return true;
      },
      error => {
        console.error("Error");
        return Observable.throw(error);
      }
    );
  }
}
