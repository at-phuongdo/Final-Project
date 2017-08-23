import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { LocalStorageModule } from 'angular-2-local-storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  errors: string;

  constructor(
    private userService: UserService, 
    private route: Router,
    private _fb: FormBuilder,
    private location: Location
    ) {
    this.loginForm = this._fb.group({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit() {
  }

  login(loginParams) {
    this.userService.login(loginParams).subscribe((data: any) => {
      if( data.status === 200){
        localStorage.setItem('currentUser',data.auth_token);
        this.route.navigate(['register']);
      } else if (data.status === 202) {
          this.errors = data.message;
      } else {
        this.errors = data.message;
      }
    })
  }


}
