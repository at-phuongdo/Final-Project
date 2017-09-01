import {Http, RequestOptions, Headers, Response } from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class OrderService {
  private checkLogin: string;
  private url = 'http://localhost:3000/api/v1/';
  constructor(private http: Http) {
  }

  // createOrder() {
  //   if (localStorage.getItem('currentUser')) {
  //     const headers = new Headers({
  //       'Content-Type': 'application/json',
  //       'Access-token': localStorage.getItem('currentUser')
  //     });
  //     const options = new RequestOptions({headers: headers});
  //     return this.http.post(this.url, body, options ).map((res: Response) => res.json());
  //   } else {
  //     alert('You need to login');
  //   }
  //
  // }
}
