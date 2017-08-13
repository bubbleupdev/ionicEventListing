import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {MapsPage} from "../maps/maps";
import {DirectionsPage} from "../directions/directions";
import {ParkingPage} from "../parking/parking";
import {RulesPage} from "../rules/rules";
import {SeasonSeatsPage} from "../season-seats/season-seats";


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  public tabs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      console.log("Tabs Page");
      this.tabs = [
          {title: 'Events', component: HomePage, icon: 'calendar'},
          {title: 'Directions', component: DirectionsPage, icon: 'compass'},
          {title: 'Parking', component: ParkingPage, icon: 'car'},
          {title: 'Maps', component: MapsPage, icon: 'map'}
      ];
  }


}
