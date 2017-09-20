import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../service/item/item.service';
import {CartService} from '../../service/cart/cart.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  listNewItems: any;
  listBestItems: any;
  carts: any;

  constructor(
    private itemService: ItemService, 
    private cartService: CartService) { }

  ngOnInit() {
    this.itemService.getNewItems().subscribe((data: any) => {
      this.listNewItems = data;
    });

    this.itemService.getBestItems().subscribe((data: any) => {
      this.listBestItems = data;
    });
  }
  addItemToCart(item: any) {
    this.cartService.checkQuantity(item);
  }
}
