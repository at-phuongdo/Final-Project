import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  auth_token: any;
  constructor( private router: Router) { }

  ngOnInit() {
    this.auth_token = localStorage.getItem('currentUser')
    if( !this.auth_token ) {
      alert('You have to login!');
      this.router.navigate(['login']);
    }
  }

  editProfile() {
    this.router.navigate(['profile/edit']);
  }

  showHistoryOrder() {
    this.router.navigate(['history-orders']);

  }
}
