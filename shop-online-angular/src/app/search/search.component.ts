import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../service/item/item.service';
import { CartService } from '../service/cart/cart.service';
import {isUndefined} from "util";
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  sub: any;
  key: string;
  total: number;
  totalpage: any;
  current_page: number;
  page: number;
  listResult: any;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private cartService: CartService, 
    private appService: AppService
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(querParams => {
      if (querParams['key'] === undefined) {
        this.key = '';
      }else {
        this.key = querParams['key'];
      }
      this.page = +querParams['page'] || 1;
      this.itemService.search(this.key.toString(), this.page, 12).subscribe((data: any) => {
        this.total = data.meta['total'];
        this.listResult = data.items;
        this.totalpage = [];
        this.current_page = this.appService.getPager(this.total, this.page).currentPage;
        for (let i = this.appService.getPager(this.total, this.page).startPage; i <= this.appService.getPager(this.total, this.page).endPage; i++) {
          this.totalpage.push(i);
        }
        window.scrollTo(0, 0);
      }, error => {
        console.error("Error");
      });
    });
  }

  addItemToCart(item: any) {
    this.cartService.addItem(item);
  }

}
