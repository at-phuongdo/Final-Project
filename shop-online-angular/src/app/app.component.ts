import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app';
  private checkLogin: boolean;
  private firstName: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.checkLogin = true;
      this.userService.getUserByToken(localStorage.getItem('currentUser')).subscribe((user: any) => {
        this.firstName = user.firstname;
      })
    }
    else{
      this.checkLogin = false;
    }

  }

  ngOnChanges() {}

  logout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
      location.reload();
    }
  }
}
