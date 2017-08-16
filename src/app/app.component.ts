import {Component, ViewChild} from '@angular/core';
import {AlertController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {MapsPage} from "../pages/maps/maps";
import {DirectionsPage} from "../pages/directions/directions";
import {ParkingPage} from "../pages/parking/parking";
import {RulesPage} from "../pages/rules/rules";
import {SeasonSeatsPage} from "../pages/season-seats/season-seats";
import {TabsPage} from "../pages/tabs/tabs";
import {Push, PushObject, PushOptions} from '@ionic-native/push';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController,
              public push: Push) {

    this.pages = [
      // {title: 'Events', component: TabsPage, icon: 'calendar'},
      // {title: 'Directions', component: DirectionsPage, icon: 'compass'},
      // {title: 'Parking', component: ParkingPage, icon: 'car'},
      // {title: 'Maps', component: MapsPage, icon: 'map'},
      {title: 'Rules', component: RulesPage, icon: 'information-circle'},
      {title: 'Season Seats', component: SeasonSeatsPage, icon: 'calendar'},
    ];

    platform.ready().then(() => {
      statusBar.styleLightContent();
      this.pushsetup();
    });
  }

  openPage(page) {
    this.nav.push(page.component);
  }
  pushsetup() {
    console.log("Setup Push Notifications");

    const options: PushOptions = {
      android: {
        senderID: '406620653991'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let pushAlert = this.alertCtrl.create({
          title: notification.title,
          message: notification.message
        });
        pushAlert.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.dir(registration);
      //do whatever you want with the registration ID
    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));

  }
  togglePush() {

  }
}

