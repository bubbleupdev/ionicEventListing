import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";

@IonicPage()
@Component({
  selector: 'page-detail-page',
  templateUrl: 'detail-page.html',
})
export class DetailPage {

  public id: string;

  public event = {blurb_html:null,at:null};
  public page = {title:null, image:null};

  public eventDate: string = null;
  public eventTime: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ApiProvider, public loadingCtrl: LoadingController) {
    this.id = this.navParams.get('id');
      let loading = this.loadingCtrl.create({
          content: 'Please wait...'
      });
      loading.present();
    this.service.getEventById(this.id)
        .subscribe(
            data => {
              this.event = data;
              this.page = data.page;
              this.eventDate = this.service.formatDate(this.event);
              this.eventTime = this.service.formatTime(this.event);
                loading.dismiss();
            }
        );
  }

    openUrl(path) {
        window.open(path, '_system');
    }

}
