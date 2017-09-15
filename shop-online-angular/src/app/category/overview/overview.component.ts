import { CartService } from '../../service/cart/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from '../../service/category/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  ids: any;
  listSubCate: Array<any>;
  listProduct: Array<any>;


  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { 
    this.listProduct = [];
    this.listSubCate = [];
  }

  ngOnInit() {
    this.getSubCategory();
  }

  getSubCategory() {
    this.categoryService.getSubCategory().subscribe(data => {
      this.ids = data.sub_cate; 
      for(let sub_cate of this.ids){
        this.categoryService.getProductOverView(sub_cate.id).subscribe(data => {
          this.listSubCate.push(sub_cate);
          this.listProduct.push(data.items);
        });
      }
    });
  }

  addItemToCart(item: any) {
    this.cartService.addItem(item);
  }
}
