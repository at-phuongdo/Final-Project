import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class CommentService {

  private url = "http://localhost:3000/api/v1/comments";
  private headers: any;
  private options: any;

  constructor(
    private http: Http,
    private route: ActivatedRoute) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Access-token': localStorage.getItem('currentUser')
    })
    this.options = new RequestOptions({ headers: this.headers });
  }

  sendComment(comment: any) {
    const body = JSON.stringify(comment);
    return this.http.post(this.url, body, this.options).map((res: Response) => res.json());
  }

  getAllComment(id, page){
    return this.http.get(this.url+ '?item='+ id + '&page=' +page).map((res: Response) => res.json());
  }

}
