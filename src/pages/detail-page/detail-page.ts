import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";
import {DomSanitizer} from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: 'page-detail-page',
  templateUrl: 'detail-page.html',
})
export class DetailPage {

  public event: any = null;
  public page: any = null;
  public eventDate: string = null;
  public eventTime: string = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public service: ApiProvider,
              public domSanitizer: DomSanitizer) {

    this.event = this.navParams.get('event');
    console.dir(this.event);

    if (this.event) {
      this.page = this.event.page;
      this.eventDate = this.service.formatDate(this.event);
      this.eventTime = this.service.formatTime(this.event);
      // loading.dismiss();
    }
  }

  openUrl(path) {
    window.open(path, '_system');
  }

}
