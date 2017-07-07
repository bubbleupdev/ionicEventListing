import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";


@IonicPage()
@Component({
  selector: 'page-directions',
  templateUrl: 'directions.html',
})
export class DirectionsPage {


  public page: any;
  private path: string = "directions";

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
    this.apiProvider.getPage(this.path).subscribe(
        data => {
          this.page = data;
        }
    );
  }

}
