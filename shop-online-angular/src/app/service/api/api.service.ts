import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ApiService {

  constructor( private http: Http) { }
  private url = 'http://prod.boxme.vn/api/public/api/merchant/rest/lading';

  getCity() {
    return this.http.get(this.url+'/city').map(res => res.json());
  }

  getDistrict(id) {
    return this.http.get(this.url+'/province/'+id).map(res => res.json());
  }

  getVillage(id) {
    return this.http.get(this.url+'/ward/'+id).map(res => res.json());
  }
}