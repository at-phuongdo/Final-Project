import { Http, RequestOptions, Headers, Response } from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class OrderService {

  private checkLogin: string;
  private url = 'http://localhost:3000/api/v1/';
  private carts: any;
  private headers: any;
  private options: any;

  constructor(private http: Http) {
    let carts;
    carts = localStorage.getItem('cart');
    this.carts = carts !== null ? JSON.parse(carts) : [];
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Access-token': localStorage.getItem('currentUser')
    });
    this.options = new RequestOptions({headers: this.headers});
  }

  createOrder(body) {
      return this.http.post(this.url + 'orders',body, this.options ).map((res: Response) => res.json());
    }
}
