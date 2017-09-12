import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService} from '../../service/user/user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  sub: any;
  user: any;
  updateForm: any;
  genderArr: Array<string> = [];
  constructor(private userService: UserService,
    private _fb: FormBuilder,
    private router: Router) {
    this.genderArr = ['male', 'female', 'orther'];
     }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.sub = this.userService.getUserByToken(localStorage.getItem('currentUser')).subscribe(data=>{
        this.user = data;
        this.updateForm = this._fb.group({
          firstname: new FormControl(this.user.firstname),
          lastname: new FormControl(this.user.lastname),
          gender: [this.user.gender],
          email: new FormControl(this.user.email),
          birthday: new FormControl(this.user.birthday),
          address: new FormControl(this.user.address),
          phone: new FormControl(this.user.phone),
          avatar: new FormControl('')
        });
      });
    }
  }

  cancel() {
    this.router.navigate(['profile']);
  }

  update(value: any) {
    let body = {'user': value};
    console.log(this.user.id);
    this.userService.update(body, this.user.id).subscribe( data =>{
      alert('Update profile complete');
      this.router.navigate(['profile']);
    },(err: any) => {
        alert( 'Fail!' + err);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
