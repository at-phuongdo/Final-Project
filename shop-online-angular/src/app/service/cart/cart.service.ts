import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http, RequestOptions, Headers, Response} from '@angular/http';

@Injectable()
export class CartService implements OnDestroy {
  public login = new Subject<any>();
  carts: any;
  private checkLogin: string;
  private url = 'http://localhost:3000/api/v1/';
  constructor(private http: Http) {
    let carts;
    carts = localStorage.getItem('cart');
    this.carts = carts !== null ? JSON.parse(carts) : [];
  }
  getCarts() {
    localStorage.getItem('cart');
  }
  addItem(product: any) {
    let existItem: any;
    this.carts.forEach(function (item) {
      if (item.id === product.id) {
        existItem = item;
        console.log('da co');
        item.quantity++;
        return false;
      }
    });
    if (existItem === undefined) {
      let cartItem;
      cartItem = Object.assign({}, product);
      cartItem.quantity = 1;
      console.log(cartItem);
      this.carts.push(cartItem);
    }
    this.saveCartToLocalStorage();
  }
  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.carts));
  }
  getTotal() {
    let total: number;
    total = 0;
    this.carts.forEach(function (item) {
      total += (item.price * item.quantity);
    });
    return total;
  }
  removeItem(item) {
    let index;
    index = this.carts.indexOf(item);
    this.carts.splice(index, 1);
    this.saveCartToLocalStorage();
  }
  removeCart() {
    this.carts = [];
    this.saveCartToLocalStorage();
  }
  ngOnDestroy() {
    console.log('Destroy');
    localStorage.setItem('cart', this.carts.toString());
  }

  removeQuantity(product: any) {
    this.carts.forEach(function (item) {
      if (item.id === product.id) {
        if (item.quantity > 1) {
          item.quantity--;
        }
        return false;
      }
    });
    this.saveCartToLocalStorage();
  }

  createOrder() {
    if (localStorage.getItem('currentUser')) {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-token': localStorage.getItem('currentUser')
      });
      const options = new RequestOptions({headers: headers});
      const body = this.carts;
      console.log(body);
      return this.http.post(this.url + 'order', body, options ).map((res: Response) => res.json());
    } else {
      alert('You need to login');
    }
  }
}
