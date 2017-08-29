import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ItemService {

  constructor(private http: Http) { }
  private url = 'http://localhost:3000/api/v1/';
  getAll() {
    return this.http.get(this.url+"/items").map(res => res.json());
  }

  getDetail(id) {
    return this.http.get(this.url+"details/"+id).map(res => res.json());
  }

  getImages(id) {
    return this.http.get(this.url+"items/"+id+"/images_items").map(res => res.json());
  }
}
