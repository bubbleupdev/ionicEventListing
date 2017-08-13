import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventsService {
  public data;

  constructor(public http: Http) {
    console.log('Hello EventsService Provider');
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
  

    return new Promise(resolve => {
      this.http.get('https://woodlandscenter.dev.busites.com/app-api/events?_format=json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}

