import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../service/item/item.service';
import { Component, OnInit } from '@angular/core';
import {CartService} from '../service/cart/cart.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  errors: any;
  sub: any;
  id: number;
  detail: any;
  images_items: any;
  relativeItem: any;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private toasterService: ToasterService
  ) {
    this.detail = {};
    this.images_items = [];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getDetail(this.id);
      this.getImages(this.id);
      window.scrollTo(0, 0);

    });
  }

  getDetail(id: number) {
    this.itemService.getDetail(id).subscribe(data => {
      this.detail = data.item;
      this.relativeItem = data.meta['relativeItem'];
      this.errors = data.message;
    });
  }

  getImages(id: number) {
    this.itemService.getImages(id).subscribe(data => {
      this.images_items = data.image_items;
    });
  }

  addItemToCart(item: any) {
    this.cartService.checkQuantity(item);
  }
}
