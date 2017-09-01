import { Component, OnInit } from '@angular/core';
import {CartService} from '../service/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private carts: any;
  private total: number;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.carts = this.cartService.carts;
    this.total = this.cartService.getTotal();
  }
  removeItem(cart: any) {
    this.cartService.removeItem(cart);
  }

  addItemToCart(item: any) {
    this.cartService.addItem(item);
  }

  removeQuantity(item: any) {
    this.cartService.removeQuantity(item);
  }

  order() {
    this.cartService.createOrder();
  }
}
