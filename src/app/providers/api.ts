import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Api {

  constructor(public http: Http) {
  }
  
  get( url: string , endpoint: string, params?: any, options?: RequestOptions) {        
    
    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for(let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }
    
    return this.http.get(url + '/' + endpoint, options);
  }

  post(url: string , endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(url + '/' + endpoint, body, options);
  }

  put(url: string , endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(url + '/' + endpoint, body, options);
  }

  delete(url: string , endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(url + '/' + endpoint, body, options);
  }

  patch(url: string , endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(url + '/' + endpoint, body, options);
  }

}
