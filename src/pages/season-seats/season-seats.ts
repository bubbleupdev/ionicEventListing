import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";


@IonicPage()
@Component({
  selector: 'page-season-seats',
  templateUrl: 'season-seats.html',
})
export class SeasonSeatsPage {


  public page: any;
  private path: string = "season-seats";

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
    this.apiProvider.getPage(this.path).subscribe(
        data => {
          this.page = data;
        }
    );
  }

}
