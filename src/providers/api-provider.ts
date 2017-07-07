import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider {
  private apiHeaders: Headers = new Headers;
  private opts;
  private apiUrl = 'https://woodlandscenter.7.dev.bubbleup.com/app-api/';
  // private apiUrl = 'https://www.woodlandscenter.org/app-api/';
  constructor(public http: Http) {

    // TODO get the headers working.
    // this.apiHeaders.set('Content-type', 'application/json')

    this.opts = new RequestOptions({
      headers: this.apiHeaders
    })
  }

  getEvents() {
  	// debugger;
    return this.http.get(this.apiUrl + 'events',this.opts)
    .map(res => res.json())
  }

  getEventById($id) {

    return this.http.get(this.apiUrl + 'events?id=' + $id + '&_format=json')
        .map(res => res.json())
  }

  getPage(path=null){
    return this.http.get(this.apiUrl+'pages?path='+path).map(res => res.json());
  }

  formatDate(event) {

    if(event) {
      var date = new Date(event.at + ' UTC');

      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var dayIndex = date.getDay();

      var dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dayIndex];

      return dayOfWeek + ' ' + monthNames[monthIndex] + ' ' + day;
    }
    return null;

  }

  formatTime(event){
    var date = new Date(event.at + ' UTC');
    var h = this.checkTime(date.getHours());
    var m = this.checkTime(date.getMinutes());
    var time = h + ":" + m;
    return time;
  }

  checkTime(i) {
    return (i < 10) ? "0" + i : i;
  }

  isEmptyObject(obj) {
    return (Object.keys(obj).length === 0);
  }
}
