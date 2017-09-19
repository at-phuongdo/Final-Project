import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ShopService {

  constructor(private http: Http) { }
  private url = 'http://localhost:3000/api/v1/';

  getShopById(id: number) {
    return this.http.get(this.url + 'shops/' + id).map(res => res.json());
  }

  getAll() {
    return this.http.get(this.url + 'shops').map(res => res.json());
  }
}
