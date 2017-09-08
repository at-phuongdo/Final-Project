import { AppService } from '../service/app.service';
import { CategoryService } from '../service/category/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private categoryService: CategoryService,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.dir = "&dir=asc";
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.route.queryParams.subscribe(queryParams => {
        this.page = +queryParams['page'] || 1;
      })
      this.listProductByCategory(this.id, this.page);
      this.url = "/searches/"+this.id;
    });
    this.route.queryParams.subscribe(queryParams => {
      this.page = +queryParams['page'] || 1;
       this.route.params.subscribe(params => {
        this.listProductByCategory(this.id, this.page);
        this.url = "/searches/"+this.id;
       });
    });
  }

  listProductByCategory(id: any, page) {
    this.categoryService.getAllProductByCategory(id,page).subscribe(data => {
      this.listProduct = data.items;
      this.total = data.meta['total'];
      this.totalpage = [];
      this.startPage = this.appService.getPager(this.total, this.page).startPage;
      this.endPage = this.appService.getPager(this.total, this.page).endPage;
      for(let i = this.startPage; i <= this.endPage; i++) {
        this.totalpage.push(i);
      }
    })
  }

  sortBy(type: any) {
    this.type = type ;
    if (this.type == undefined) {
      this.type = this.url+'?order=name';
    }
    this.categoryService.sortBy(this.type+this.dir).subscribe(data => {
      this.listProduct = data.list_product;
    })
  }

  sortType(dir) {
    this.dir = dir;
    this.sortBy(this.type);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
