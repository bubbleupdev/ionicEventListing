import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{ title: string, component: any, icon: any }>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this.pages = [
      {title: 'Home', component: HomePage, icon: 'home'},
    ];

    platform.ready().then(() => {
      statusBar.styleLightContent();

    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

