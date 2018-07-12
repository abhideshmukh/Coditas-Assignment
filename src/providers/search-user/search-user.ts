import { HttpClient } from "@angular/common/http";
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';


/*
  Generated class for the SearchUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchUserProvider {
  constructor(public httpClient: HttpClient, public http: Http) {
    console.log('Hello SearchUserProvider Provider');
  }

  searchUser(string,page,filter){
    let baseUrl = 'https://api.github.com/search/users?q='+string+"&page="+page+"&per_page=10";
    if(filter != null){
      baseUrl = 'https://api.github.com/search/users?q='+string+"&page="+page+"&per_page=10&order="+filter
    }
    return this.http.get(baseUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    return Observable.throw(error.json().error || "Server error");
  }

}
