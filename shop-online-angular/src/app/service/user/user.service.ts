import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { LocalStorageModule } from 'angular-2-local-storage';

@Injectable()
export class UserService {

  private url = "http://localhost:3000/api/v1/";
  constructor(private http: Http, private localStorage: LocalStorageModule) {}

  getAll() {
    return this.http.get(this.url + 'users').map(res => res.json());
  }

  registerUser(user) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers : headers });
    let body = JSON.stringify(user);
    return this.http.post(this.url + 'users', body, options ).map((res: Response) => res.json());
  }

  login(loginParams) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers : headers });
    let body = JSON.stringify(loginParams);
    return this.http.post(this.url + 'login', body, options ).map((res: Response) => res.json());
  }

  resetPassword(user) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers : headers });
    let body = JSON.stringify(user);
    return this.http.post(this.url + 'reset_passwords ', body, options ).map((res: Response) => res.json());
  }

  updatePassword(user, id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers : headers });
    let body = JSON.stringify(user);
    return this.http.put(this.url + 'reset_passwords/'+id, body, options ).map((res: Response) => res.json());
  }
}
