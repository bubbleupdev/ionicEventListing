import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Events {
  private apiHeaders: Headers = new Headers;
  private opts;
  constructor(public http: Http) {

    // TODO get the headers working.
    this.apiHeaders.set('Content-type', 'application/json')

    this.opts = new RequestOptions({
      headers: this.apiHeaders
    })
  }

  getEvents() {
  	// debugger;
    return this.http.get('https://woodlandscenter.dev.busites.com/app-api/events?_format=json')
    .map(res => res.json())
  }

  getEventById($id) {

    return this.http.get('https://woodlandscenter.dev.busites.com/app-api/events?id=' + $id + '&_format=json')
        .map(res => res.json())
  }

}
