import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Events {
  constructor(public http: Http) {
    console.log('Hello Events Provider');
  }

  getEvents() {
  	debugger;
    return this.http.get('https://woodlandscenter.dev.busites.com/app-api/events?_format=json')
    .map(res => res.json())
  }

}
