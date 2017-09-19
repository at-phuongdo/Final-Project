import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './service/user/user.service';
import { CartService } from './service/cart/cart.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from './service/category/category.service';
import { ShopService } from './service/shop/shop.service';

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
  listCategory: any;
  subCategory: any;
  listShops: any;

  constructor(private userService: UserService,
              private cartService: CartService,
              private categoryService: CategoryService,
              private _fb: FormBuilder,
              private router: Router,
              private shopService: ShopService) {
    this.quantity = 0;
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.checkLogin = true;
      this.userService.getUserByToken(localStorage.getItem('currentUser')).subscribe((user: any) => {
        this.firstName = user.firstname;
      });
    } else {
      this.checkLogin = false;
    }
    this.searchForm = this._fb.group({
      key: new FormControl('')
    });
    this.getAllCategory();
    this.getAllShops();
  }

  ngDoCheck() {
    this.quantity = this.cartService.getQuantity();
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

  getAllCategory(){
    this.categoryService.getAllCategory().subscribe(data => {
     this.listCategory = data.categories;
    })
  }

getAllShops() {
  this.shopService.getAll().subscribe( data => {
    this.listShops = data.slice(0,6);
  });
}
  ngOnDestroy() {

  }
}
