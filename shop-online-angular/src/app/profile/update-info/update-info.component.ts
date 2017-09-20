import {Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';


@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit, OnDestroy {
  sub: any;
  user: any;
  updateForm: any;
  genderArr: Array<string> = [];
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({cloudName: 'dobcevjy1', uploadPreset: 'tuUnsignedUpload'})
  );
  avatar: string;
  @Output()
  add: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserService,
              private _fb: FormBuilder,
              private router: Router) {
    this.genderArr = ['male', 'female', 'other'];
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      this.avatar = res.url;
      return {item, response, status, headers};
    };
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.sub = this.userService.getUserByToken(localStorage.getItem('currentUser')).subscribe(data => {
        this.user = data;
        this.avatar = this.user.avatar;
        this.updateForm = this._fb.group({
          firstname: new FormControl(this.user.firstname),
          lastname: new FormControl(this.user.lastname),
          gender: [this.user.gender],
          email: new FormControl(this.user.email),
          birthday: new FormControl(this.user.birthday),
          address: new FormControl(this.user.address),
          phone: new FormControl(this.user.phone),
          avatar: new FormControl(this.avatar)
        });
      });
    }
  }

  cancel() {
    this.router.navigate(['profile']);
  }

  update(value: any) {
    this.uploader.uploadAll();
    setTimeout(() => {
      value.avatar = this.avatar;
      this.userService.avatar.next(value);
      let body = {'user': value};
      this.userService.update(body, this.user.id).subscribe(data => {
        alert('Update profile complete');
        this.router.navigate(['profile']);
      }, (err: any) => {
        alert('Fail!' + err);
      });
    }, 5000);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
