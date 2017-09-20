import { ToasterService } from 'angular2-toaster';
import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http, RequestOptions, Headers, Response} from '@angular/http';

@Injectable()
export class CartService implements OnDestroy {

  carts: any;
  private url = 'http://localhost:3000/api/v1/';

  constructor(
    private http: Http,
    private toasterService: ToasterService) {
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

  getQuantity() {
    let quantity = 0;
    this.carts.forEach(function (item) {
      quantity += item.quantity;
    });
    return quantity;
  }

  ngOnDestroy() {
    console.log('Destroy');
    localStorage.setItem('cart', this.carts.toString());
  }

  checkQuantity(item) {
    let check = false;
    let itemCart;
    for (let obj of this.carts) {
      if (item.id === obj.id) {
        itemCart = obj;
        check = true;
        break;
      }
    }
    if (check == true ){
      if (item.quantity > itemCart.quantity) {
        this.addItem(item);
        this.toasterService.pop('success', 'Add to cart , Complete!');
      } else {
        this.toasterService.pop('warning', 'Quantity not enough');
      }
    } else {
      this.addItem(item);
      this.toasterService.pop('success', 'Add to cart , Complete');
    }
  }
}
