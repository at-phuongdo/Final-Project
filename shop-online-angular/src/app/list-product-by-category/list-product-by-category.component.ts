import { AppService } from '../service/app.service';
import { CategoryService } from '../service/category/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart/cart.service';
import { ItemService } from '../service/item/item.service';

@Component({
  selector: 'app-list-product-by-category',
  templateUrl: './list-product-by-category.component.html',
  styleUrls: ['./list-product-by-category.component.css']
})
export class ListProductByCategoryComponent implements OnInit {

  id: any;
  listProduct: any;
  sub: any;
  url: any;
  location: any;
  dir: string;
  type: string;
  page: any;
  total: number;
  totalpage: any;
  startPage: number;
  endPage: number;
  categoryName: any;

  constructor(
    private categoryService: CategoryService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private itemService: ItemService
  ) { 
    this.dir = 'asc';
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.route.queryParams.subscribe(queryParams => {
        this.type = queryParams['order'];
        this.dir = queryParams['dir'] || 'asc';
        this.page = +queryParams['page'] || 1;
      })
      this.sortBy(this.type, this.page);
    });
    this.route.queryParams.subscribe(queryParams => {
      this.page = +queryParams['page'] || 1;
      this.type = queryParams['order'];
      this.dir = queryParams['dir'] || 'asc';
      this.route.params.subscribe(params => {
        this.sortBy(this.type, this.page);
       });
    });
  }

  sortBy(type: any, page) {
    page = page || 1;
    this.page = page;
    this.type = type ;
    if (this.type == undefined) {
      this.type = 'name';
    }
    this.categoryService.sortBy(this.id+'?order='+this.type+'&dir='+this.dir, page).subscribe(data => {
      this.listProduct = data.items;
      this.categoryName = data.meta['categoryName'];
      this.total = data.meta['total'];
      this.totalpage = [];
      this.startPage = this.appService.getPager(this.total, this.page).startPage;
      this.endPage = this.appService.getPager(this.total, this.page).endPage;
      for(let i = this.startPage; i <= this.endPage; i++) {
        this.totalpage.push(i);
      }
    })
  }

  sortType(dir) {
    this.dir = dir;
    this.page = 1;
    this.sortBy(this.type, this.page);
  }

  addItemToCart(item: any) {
    this.cartService.checkQuantity(item);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
