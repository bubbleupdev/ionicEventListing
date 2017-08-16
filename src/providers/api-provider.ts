import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as moment from "moment";


@Injectable()
export class ApiProvider {
  // readonly API_URL = 'https://www.woodlandscenter.org/api/v1/';
  readonly API_URL = 'https://api.bubbleup.net/woodlands/';

  constructor(public http: Http,  private storage: Storage) {}

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

  storeAllData(){

    let paths = [
      'directions',
      'parking',
      'pavilion-rules',
      'season-seats'
    ];

    for(let path of paths) {

      this.getPage(path).subscribe(
        data => {
          this.storage.set('page-' + path, data).then(
            () => console.log("Stored Data " + 'page-' + path),
            error => console.error('Failed to store Data page-' + path)
          );
        }
      );

    }
  }
}
