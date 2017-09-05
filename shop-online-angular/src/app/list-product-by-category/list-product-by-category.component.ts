import { CategoryService } from '../service/category/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-product-by-category',
  templateUrl: './list-product-by-category.component.html',
  styleUrls: ['./list-product-by-category.component.css']
})
export class ListProductByCategoryComponent implements OnInit {

  id: any;
  listProduct: any;
  sub: any;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.listProductByCategory(this.id);
    })
  }

  listProductByCategory(id: any) {
    this.categoryService.getAllProductByCategory(id).subscribe(data => {
      this.listProduct = data.list_product;
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
