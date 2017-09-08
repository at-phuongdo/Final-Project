import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './service/user/user.service';
import { CartService } from './service/cart/cart.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'app';
  private checkLogin: boolean;
  private firstName: string;
  quantity: number;
  carts: any[];
  sub: any;
  searchForm: any;

  constructor(private userService: UserService,
              private cartService: CartService,
              private _fb: FormBuilder,
              private router: Router) {
    this.quantity = 0;
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.checkLogin = true;
      this.userService.getUserByToken(localStorage.getItem('currentUser')).subscribe((user: any) => {
        this.firstName = user.firstname;
      });
      setTimeout(() => {
        this.quantity = this.cartService.getQuantity();
      });
    } else {
      this.checkLogin = false;
    }
    this.searchForm = this._fb.group({
      key: new FormControl('')
    });
  }

  logout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
      location.reload();
    }
  }

  search(key: string) {
    this.router.navigate(['search'], { queryParams: { key: key['key'] } });
  }

  ngOnDestroy() {

  }
}
