import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from "moment";


@Injectable()
export class ApiProvider {
  // readonly API_URL = 'https://www.woodlandscenter.org/api/v1/';
  readonly API_URL = 'https://api.bubbleup.net/woodlands/';

  constructor(public http: Http) {}

  /**
   *
   * @returns {Observable<any | Promise<any>>}  Object of Events
   */
  getEvents() {
    return this.http.get(this.API_URL + 'events').map(res => res.json())
  }

  /**
   *
   * @param $id
   * @returns {Observable<any | Promise<any>>} Object of Single Event
   */
  getEventById($id) {
    return this.http.get(this.API_URL + 'events/' + $id).map(res => res.json())
  }

  /**
   *
   * @param {any} path
   * @returns {Observable<any | Promise<any>>} Object of a single Page
   *
   */
  getPage(path = null) {
    return this.http.get(this.API_URL + 'pagespath/' + path).map(res => res.json());
  }

  /**
   *
   * @param event
   * @returns {string}
   */
  formatDate(event) {

    try {
      return moment(event.at).format('dddd MMMM Do');
    } catch (e) {
      console.error(event.page.title + " does not have a date");
    }
  }

  /**
   *
   * @param event
   * @returns {string}
   */
  formatTime(event) {
    try {
      return moment.utc(event.at).format('h:mm a');
    } catch (e) {
      console.error(event.page.title + " does not have a date");
    }
  }
}
