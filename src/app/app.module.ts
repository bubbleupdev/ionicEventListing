import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { HttpModule} from '@angular/http';
import {DetailPage} from "../pages/detail-page/detail-page";
import {ApiProvider} from "../providers/api-provider";
import {MapsPage} from "../pages/maps/maps";
import {DirectionsPage} from "../pages/directions/directions";
import {ParkingPage} from "../pages/parking/parking";
import {RulesPage} from "../pages/rules/rules";
import {SeasonSeatsPage} from "../pages/season-seats/season-seats";
import {IonicImageViewerModule} from "ionic-img-viewer";
import {IonicStorageModule} from '@ionic/storage';
import {ImageZoomPage} from "../pages/image-zoom/image-zoom";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {TabsPage} from "../pages/tabs/tabs";
import {Push} from "@ionic-native/push";
import {FirebaseAnalytics} from "@ionic-native/firebase-analytics";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    MapsPage,
    DirectionsPage,
    ParkingPage,
    RulesPage,
    SeasonSeatsPage,
    ImageZoomPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    MapsPage,
    DirectionsPage,
    ParkingPage,
    RulesPage,
    SeasonSeatsPage,
    ImageZoomPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiProvider,
    PhotoViewer,
    Push,
    FirebaseAnalytics,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
