import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Events} from "../../providers/events";

@IonicPage()
@Component({
  selector: 'page-detail-page',
  templateUrl: 'detail-page.html',
})
export class DetailPage {

  public id: string;

  public event = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: Events) {
    this.id = this.navParams.get('id');
    console.log("Detail Page");
    console.log(this.id);
    this.service.getEventById(this.id)
        .subscribe(
            data => this.event = data
        );

    console.dir(this.event);
  }

}
