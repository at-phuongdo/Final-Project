import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ItemService {

  constructor(private http: Http) { }
  private url = 'http://localhost:3000/api/v1/';

  getAll() {
    return this.http.get(this.url+"items?check=all").map(res => res.json());
  }

  getNewItems() {
    return this.http.get(this.url+"items?check=new").map(res => res.json());
  }

  getBestItems() {
    return this.http.get(this.url+"items?check=best").map(res => res.json());
  }


}
