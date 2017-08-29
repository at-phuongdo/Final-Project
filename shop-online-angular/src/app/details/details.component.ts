import { Element } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../service/item/item.service';
import { Component, OnInit, ElementRef } from '@angular/core';

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

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) { 
    this.detail = {};
    this.images_items = [];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.itemService.getDetail(this.id).subscribe(data => {
      this.detail = data;
      this.errors = data.message;
      console.log(this.detail);
    });
    this.itemService.getImages(this.id).subscribe(data => {
      this.images_items = data;
      console.log(this.images_items);
    });
  }
}
