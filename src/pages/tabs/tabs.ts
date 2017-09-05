import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {HomePage} from "../home/home";
import {MapsPage} from "../maps/maps";
import {DirectionsPage} from "../directions/directions";
import {RulesPage} from "../rules/rules";


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  public tabs: any;
  constructor() {
    this.tabs = [
      {title: 'Events', component: HomePage, icon: 'calendar'},
      {title: 'Directions', component: DirectionsPage, icon: 'compass'},
      {title: 'Rules', component: RulesPage, icon: 'information-circle'},
      {title: 'Maps', component: MapsPage, icon: 'map'}
    ];
  }


}
