import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../service/item/item.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  listItems: any;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getAll().subscribe((data: any) => {
      this.listItems = data;
    });
  }

}
