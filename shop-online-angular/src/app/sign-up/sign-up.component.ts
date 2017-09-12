import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: any;
  status: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private router: Router
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
        this.status = data.status;
        if ( this.status === 'created') {
          alert('Please check you email to active your account!');
          this.router.navigate(['']);
        }
         
        else
          alert('Please try again!');
      },
      error => {
        console.error("Error");
        return Observable.throw(error);
      }
    );
  }
}
