import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  updatePasswordForm: any;
  sub: any;
  id: any;
  errors: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this.updatePasswordForm = this._fb.group({
      password: new FormControl(''),
      confirm_password:  new FormControl('')
    });
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
  }

  updatePassword(user,id){
    this.userService.updatePassword(user,this.id).subscribe(data => {
        this.errors = data.message;
      },
      error => {
        console.error("Error");
        return Observable.throw(error);
      }
    )
  }
}
