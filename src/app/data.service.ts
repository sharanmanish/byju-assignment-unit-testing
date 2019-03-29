import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private _http: HttpClient) { }

  getData() {
    return this._http.get('https://api.myjson.com/bins/1fq8pm');
  }

}