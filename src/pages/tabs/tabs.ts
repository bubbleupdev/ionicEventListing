import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {HomePage} from "../home/home";
import {MapsPage} from "../maps/maps";
import {DirectionsPage} from "../directions/directions";
import {ParkingPage} from "../parking/parking";


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  ion
  public tabs: any;

  constructor() {
    this.tabs = [
      {title: 'Events', component: HomePage, icon: 'calendar'},
      {title: 'Directions', component: DirectionsPage, icon: 'compass'},
      {title: 'Parking', component: ParkingPage, icon: 'car'},
      {title: 'Maps', component: MapsPage, icon: 'map'}
    ];
  }


}
