import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  listCategory: any;

  constructor(private categoryService: CategoryService) {
   }

  ngOnInit() {
    this.getAllCategory();
  }
  getAllCategory(){
   this.categoryService.getAllCategory().subscribe(data => {
    this.listCategory = data.categories;
   });
  }
}
