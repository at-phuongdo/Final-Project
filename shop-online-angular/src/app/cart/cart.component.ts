import { Component, OnInit } from '@angular/core';
import {CartService} from '../service/cart/cart.service';
import {ItemService} from '../service/item/item.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private carts: any;
  private total: number;
  constructor(private cartService: CartService,
    private itemService: ItemService,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.carts = this.cartService.carts;
    this.total = this.cartService.getTotal();
  }
  removeItem(cart: any) {
    this.cartService.removeItem(cart);
  }

  addItemToCart(item: any) {
    this.itemService.getItemById(item.id).subscribe( data => {
      if (data.quantity > item.quantity) {
        this.cartService.addItem(item);
        this.total = this.cartService.getTotal();
        this.toasterService.pop('success', 'Add to cart , Complete!');
      } else {
        this.toasterService.pop('warning', 'Quantity not enough');
      }
    });
  }

  removeQuantity(item: any) {
    this.cartService.removeQuantity(item);
    this.total = this.cartService.getTotal();
  }
}
