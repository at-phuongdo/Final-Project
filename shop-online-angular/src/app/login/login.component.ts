import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { LocalStorageModule } from 'angular-2-local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  errors: string;
  returnUrl: string;
  loading: boolean;

  constructor(
    private userService: UserService, 
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    ) {

    this.loginForm = this._fb.group({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if(localStorage.getItem('currentUser')) {
      this.router.navigate([this.returnUrl]);
    }
  }

  login(loginParams) {
    this.loading = true;
    this.userService.login(loginParams).subscribe((data: any) => {
      if( data.status === 200){
        localStorage.setItem('currentUser',data.auth_token);
        location.reload();
      } else if (data.status === 202) {
        this.errors = data.message;
        this.loading = false;
      } else {
        this.errors = data.message;
      }
    })
  }


}
