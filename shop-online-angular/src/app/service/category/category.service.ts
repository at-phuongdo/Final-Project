import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class CategoryService {

  constructor(private http: Http) {}
  private url= 'http://localhost:3000/api/v1/categories/';

  getAllCategory(){
    return this.http.get(this.url + "?check=all").map(res => res.json());
  }

  getSubCategory(){
    return this.http.get(this.url + "?check=sub").map(res => res.json());
  }

  getAllProductByCategory(id, page) {
    return this.http.get(this.url + id + "?check=all&per_page=6&page=" + page).map(res => res.json());
  }
  
  getProductOverView(id){
    return this.http.get(this.url + id + "?check=overview").map(res => res.json());
  }

  sortBy(type){
    console.log(type);
    return this.http.get("http://localhost:3000/api/v1/" + type + "&per_page=6").map(res => res.json());
  }
}
