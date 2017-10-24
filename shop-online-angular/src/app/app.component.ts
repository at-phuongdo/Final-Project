import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './service/user/user.service';
import { CartService } from './service/cart/cart.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from './service/category/category.service';
import { ShopService } from './service/shop/shop.service';
import { ItemService } from './service/item/item.service';
declare let $: any;

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
  search: string;
  searchName: any;
  searchList: any;

  constructor(private userService: UserService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private _fb: FormBuilder,
    private router: Router,
    private toasterSevice: ToasterService,
    private shopService: ShopService,
    private itemService: ItemService) {
    this.quantity = 0;
  }

  public toasterconfig : ToasterConfig = 
  new ToasterConfig({
    animation: 'fade',
    showCloseButton: { 'warning': true, 'error': false },
    tapToDismiss: true, 
    timeout: 2000,
    limit: 5,
    closeHtml: '<button>Close</button>',
  });

  ngOnInit() {
    $('.search-name').hide();
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

  searchItem(key: string) {
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

  somethingSearch(newvalue) {
    this.search = newvalue;
    this.itemService.search(this.search.toString(), 1, 12).subscribe((data: any) => {
      this.searchName = data.items;
      console.log(this.searchName);
    }, error => {
      console.error("Error");
    });
  }

  // showListSearch(event:any) {
  //   let key = event.keyCode || event.which;
  //   if(key == 13) {
  //     this.itemService.search(this.search.toString(), 1, 12).subscribe((data: any) => {
  //       this.searchName = data.items;
  //     }, error => {
  //       console.error("Error");
  //     });
  //   }
  // }

  closeSearch() {
    this.search = null;
    $('.search-name').hide();
  }

  disableSearch(){
    $('.search-name').hide();
  }

  enableSearch(){
    $('.search-name').show();
  }

  disableScrolling() {
    window.scrollTo(0,0);
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function() { window.scrollTo(x, y); };
  }

  ngOnDestroy() {

  }
}
