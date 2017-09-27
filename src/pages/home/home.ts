import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";
import {DetailPage} from "../detail-page/detail-page";
import {Storage} from '@ionic/storage';
import {DomSanitizer} from "@angular/platform-browser";
import * as moment from "moment";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ApiProvider]
})
export class HomePage {
  public events:any = null;
  public loading:Loading;
  public directionsUrl: string ='https://maps.apple.com/?daddr=30.1609391,-95.4626832';
  public eventDate: string = null;
  public eventTime: string = null;

  constructor(public navCtrl: NavController,
              public navparams: NavParams,
              public platform: Platform,
              public service: ApiProvider,
              private storage: Storage,
              public loadingCtrl: LoadingController,
              private firebaseAnalytics: FirebaseAnalytics,
              private launchNavigator: LaunchNavigator,
              public domSanitizer: DomSanitizer) {

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.getEvents();
    this.service.storeAllData();
    this.getDirections();
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
            if(this.loading){
              this.loading.dismiss();
              this.loading = null;
            }
          }
        );

      if(this.events===null) {
        this.storage.get('events').then((data) => {
          console.log("Getting Data");
          this.events = data;
          if(this.loading){
            this.loading.dismiss();
            this.loading = null;
          }
        }).catch(error=>{
          alert("No Network");
          if(this.loading){
            this.loading.dismiss();
            this.loading = null;
          }
        });
      }

    } catch (e){
      console.error("Something went wrong with event data. Error was", e);
    }
  }
  doRefresh(refresher) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    // this.loading.present();
    this.getEvents();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  formatDate(event) {

    try {
      return moment(event.at).format('dddd MMMM Do');
    } catch (e) {
      console.error(event.page.title + " does not have a date");
    }

  }

  openUrl(path) {
    console.log("open",path);
    window.open(path, '_system');
  }

  openDetailPage(data) {
    this.firebaseAnalytics.logEvent('page_view',data.page.title);
    this.navCtrl.push(DetailPage,{event:data});
  }

  getDirections() {

    let latitude = 30.161352;
    let longitude = -95.461979;

    if(this.platform.is('ios')) {

      // this.directionsUrl = 'maps:?daddr=30.1587681,-95.469625';
      this.directionsUrl = 'maps://?q=' + latitude + ',' + longitude;

      // this.directionsUrl = 'maps://?daddr=2005,Lake+Robins+Dr,Spring,TX,77380&ll=' + latitude + ',' + longitude +'&dirflg=d';
      // this.directionsUrl = 'http://maps.apple.com/?daddr=2005,Lake+Robins+Dr,Spring,TX,77380&ll=' + latitude + ',' + longitude +'&dirflg=d';
    }

    if(this.platform.is('android')){
      this.directionsUrl = 'geo:0,0?q=' + latitude + ',' + longitude + '(The Pavilion Parking)';
    }

  }

  navigate() {

  }

}
