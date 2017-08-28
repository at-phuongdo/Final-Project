import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../service/item/item.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  listNewItems: any;
  listBestItems: any;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getNewItems().subscribe((data: any) => {
      this.listNewItems = data.items;
      console.log(data);
    });

    this.itemService.getBestItems().subscribe((data: any) => {
      this.listBestItems = data.items;
      console.log(this.listBestItems);
    });
  }

}
