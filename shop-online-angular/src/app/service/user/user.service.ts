import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class UserService {
  constructor(private http: Http) {}
  private url = 'http://localhost:3000/api/v1/';
  getAll() {
    // return this.http.get("http://172.17.28.89:3000/api/v1/comments").map(res => res.json());
    return this.http.get(this.url+"/users").map(res => res.json());
  }

  registerUser(user) {
    console.log(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers : headers });
    let body = JSON.stringify(user);
    return this.http.post(this.url+'users', body, options ).map((res: Response) => res.json());
  }

}
