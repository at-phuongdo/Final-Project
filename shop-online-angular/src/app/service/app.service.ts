import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  constructor() { }

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
