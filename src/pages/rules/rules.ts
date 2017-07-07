import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";

@IonicPage()
@Component({
  selector: 'page-rules',
  templateUrl: 'rules.html',
})
export class RulesPage {

  public page:any;
  private path:string ="pavilion-rules";

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
    this.apiProvider.getPage(this.path).subscribe(
        data => {
          this.page = data;
        }
    );
  }

}
