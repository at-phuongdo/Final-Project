import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getAll() {
    // return this.http.get("http://172.17.28.89:3000/api/v1/comments").map(res => res.json());
    return this.http.get("http://localhost:3000/users").map(res => res.json());
  }

  registerUser(user) {
    console.log(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers : headers });
    let body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/api/v1/users', body, options ).map((res: Response) => res.json());
  }

  resetPassword(user) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers : headers });
    let body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/api/v1/reset_passwords ', body, options ).map((res: Response) => res.json());
  }

  updatePassword(user, id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers : headers });
    let body = JSON.stringify(user);
    return this.http.put('http://localhost:3000/api/v1/reset_passwords/'+id, body, options ).map((res: Response) => res.json());
  }

}
