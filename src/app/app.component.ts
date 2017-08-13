import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {MapsPage} from "../pages/maps/maps";
import {DirectionsPage} from "../pages/directions/directions";
import {ParkingPage} from "../pages/parking/parking";
import {RulesPage} from "../pages/rules/rules";
import {SeasonSeatsPage} from "../pages/season-seats/season-seats";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{ title: string, component: any, icon: any }>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this.pages = [
      {title: 'Events', component: HomePage, icon: 'calendar'},
      {title: 'Directions', component: DirectionsPage, icon: 'compass'},
      {title: 'Parking', component: ParkingPage, icon: 'car'},
      {title: 'Maps', component: MapsPage, icon: ''},
      {title: 'Rules', component: RulesPage, icon: ''},
      {title: 'Season Seats', component: SeasonSeatsPage, icon: ''},
    ];

    platform.ready().then(() => {
      statusBar.styleLightContent();

    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

