import { Injectable } from '@angular/core';

import { UserSearch } from './user-search';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  cachedValues: Array<{
    [query: string]: UserSearch
  }> = [];

  constructor(private http: HttpClient) { 
    this.http = http
  }

  userSearch = (query: string): Promise<UserSearch> => {
    let promise = new Promise<UserSearch>((resolve, reject) => {
      if (this.cachedValues[query]) {
        resolve(this.cachedValues[query])
      } else {
        this.http.get('https://api.github.com/search/users?q=' + query)
          .toPromise()
          .then( (response) => {
            resolve(response as UserSearch)
          }, (error) => {
            reject(error)
          })
      }
    })
    return promise;
  }

}
