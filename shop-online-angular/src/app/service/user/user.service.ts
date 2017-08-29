import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { LocalStorageModule } from 'angular-2-local-storage';

@Injectable()
export class UserService {

  private url = 'http://localhost:3000/api/v1/';
  private headers: any;
  private options: any;
  constructor(private http: Http, private localStorage: LocalStorageModule) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers : this.headers });
  }

  getAll() {
    return this.http.get(this.url+"/users").map(res => res.json());
  }

  registerUser(user) {
    let body = JSON.stringify(user);
    return this.http.post(this.url + 'users', body, this.options ).map((res: Response) => res.json());
  }

  login(loginParams) {
    let body = JSON.stringify(loginParams);
    return this.http.post(this.url + 'login', body, this.options ).map((res: Response) => res.json());
  }

  resetPassword(user) {
    let body = JSON.stringify(user);
    return this.http.post(this.url + 'reset_passwords ', body, this.options ).map((res: Response) => res.json());
  }

  updatePassword(user, id) {
    let body = JSON.stringify(user);
    return this.http.put(this.url + 'reset_passwords/'+id, body, this.options ).map((res: Response) => res.json());
  }

  getUserByToken(token: string) {
    return this.http.get(this.url+'users/'+token).map(res => res.json());
  }
}
