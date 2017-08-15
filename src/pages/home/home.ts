import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";
import {DetailPage} from "../detail-page/detail-page";
import {Storage} from '@ionic/storage';
import {DomSanitizer} from "@angular/platform-browser";
import * as moment from "moment";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiProvider]
})
export class HomePage {
  public events:any = null;
  public loading:any;

  constructor(public navCtrl: NavController,
              public navparams: NavParams,
              public service: ApiProvider,
              public modalCtrl: ModalController,
              private storage: Storage,
              public loadingCtrl: LoadingController,
              public domSanitizer: DomSanitizer) {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.getEvents();
  }

  getEvents(){
    try {
      this.service.getEvents()
        .subscribe(
          data => {
            this.events = data;
            this.storage.set('events', data).then(
              () => console.log("Stored Data"),
              error => console.error('Failed to store Data')
            );
            this.loading.dismiss();
          }
        );

      if(this.events===null) {
        this.storage.get('events').then((data) => {
          console.log("Getting Data");
          this.events = data;
          this.loading.dismiss();
        }).catch(error=>{
          alert("No Network");
          this.loading.dismiss();
        });
      }

    } catch (e){
      console.error("Something went wrong with event data. Error was", e);
    }
  }

  formatDate(event) {

    try {
      return moment(event.at).format('dddd MMMM Do');
    } catch (e) {
      console.error(event.page.title + " does not have a date");
    }

  }

  openUrl(path) {
    window.open(path, '_system');
  }

  openDetailPage(path) {
    this.navCtrl.push(DetailPage,{event:path});
  }

}
