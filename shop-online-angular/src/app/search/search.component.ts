import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../service/item/item.service';
import {isUndefined} from "util";

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
    private itemService: ItemService
    ) { }

  ngOnInit() {
      this.route.queryParams.subscribe(querParams => {
        if (querParams['key'] === undefined) {
          this.key = '';
        }else {
          this.key = querParams['key'];
        }
        this.page = +querParams['page'] || 1;
        this.itemService.search(this.key.toString(), this.page, 9).subscribe((data: any) => {
          this.total = data.meta['total'];
          console.log(this.total);
          // if (this.total )
          this.listResult = data.items;
          this.totalpage = [];
          this.current_page = this.getPager(this.total, this.page).currentPage;
          for (let i = this.getPager(this.total, this.page).startPage; i <= this.getPager(this.total, this.page).endPage; i++) {
            this.totalpage.push(i);
          }
          window.scrollTo(0, 0);
        }, error => {
          console.error("Error");
        });
      });
  }

  getPager(total: number, currentPage: number = 1) {
    let startPage: number, endPage: number;
    if (total <= 10) {
      startPage = 1;
      endPage = total;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= total) {
        startPage = total - 9;
        endPage = total;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    return {
      currentPage: currentPage,
      total: total,
      startPage: startPage,
      endPage: endPage
    };
  }

}
