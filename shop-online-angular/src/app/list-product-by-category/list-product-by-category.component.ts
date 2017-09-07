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

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.dir = "";
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.listProductByCategory(this.id);
      this.url = "/searches/"+this.id;
    })
  }

  listProductByCategory(id: any) {
    this.categoryService.getAllProductByCategory(id).subscribe(data => {
      this.listProduct = data.list_product;
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
