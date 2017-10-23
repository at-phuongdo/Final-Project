import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { LocalStorageModule } from 'angular-2-local-storage';
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {

  private url = 'http://localhost:3000/api/v1/';
  private headers: any;
  private options: any;
  avatar: Subject<any> = new Subject<any>();

  constructor(private http: Http, private localStorage: LocalStorageModule) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers : this.headers });
  }

  getAll() {
    return this.http.get(this.url + '/users').map(res => res.json());
  }

  registerUser(user) {
    user = {'user': user};
    const body = JSON.stringify(user);
    return this.http.post(this.url + 'users', body, this.options ).map((res: Response) => res.json());
  }

  login(loginParams) {
    const body = JSON.stringify(loginParams);
    return this.http.post(this.url + 'login', body, this.options ).map((res: Response) => res.json());
  }

  resetPassword(user) {
    const body = JSON.stringify(user);
    return this.http.post(this.url + 'reset_passwords ', body, this.options ).map((res: Response) => res.json());
  }

  updatePassword(user, id) {
    const body = JSON.stringify(user);
    return this.http.put(this.url + 'reset_passwords/' + id, body, this.options ).map((res: Response) => res.json());
  }

  getUserByToken(token: string) {
    return this.http.get(this.url + 'users/' + token).map(res => res.json());
  }

  update(body: any, id: number) {
    let headers = new Headers({'Content-Type': 'application/json',
      'Access-token': localStorage.getItem('currentUser')});
    let options = new RequestOptions({ headers : headers});
    body = JSON.stringify(body);
    return this.http.put(this.url + 'users/' + id, body, options ).map((res: Response) => res.json());
  }
}
