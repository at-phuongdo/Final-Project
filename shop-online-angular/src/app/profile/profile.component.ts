import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  auth_token: any;
  avatar: any;
  sub: any;

  constructor(private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.auth_token = localStorage.getItem('currentUser');
    if (!this.auth_token) {
      alert('You have to login!');
      this.router.navigate(['login']);
    } else {
      this.sub = this.userService.getUserByToken(localStorage.getItem('currentUser')).subscribe(data => {
        this.avatar = data.avatar;
      });
      this.userService.avatar.subscribe(data => {
        this.avatar = data.avatar;
      });
    }
  }

  editProfile() {
    this.router.navigate(['profile/edit']);
  }

  showHistoryOrder() {
    this.router.navigate(['history-orders']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
