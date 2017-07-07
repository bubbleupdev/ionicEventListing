import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";

@IonicPage()
@Component({
  selector: 'page-parking',
  templateUrl: 'parking.html',
})
export class ParkingPage {


  public page: any;
  private path: string = "parking";

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
    this.apiProvider.getPage(this.path).subscribe(
        data => {
          this.page = data;
          console.log(this.page);
        }
    );
  }
}
