import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";
import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-directions',
  templateUrl: 'directions.html',
})
export class DirectionsPage {


  public page: any = null;
  private path: string = "directions";

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private storage: Storage,
      public apiProvider: ApiProvider
  ) {
      try {
          this.apiProvider.getPage(this.path).subscribe(
              data => {
                  this.page = data;
                  this.storage.set('page-' + this.path, data).then(
                      () => console.log("Stored Data " + 'page-' + this.path),
                      error => console.error('Failed to store Data page-' + this.path)
                  );
              }
          );

          if(this.page===null){
              this.storage.get('page-' + this.path).then((data) => {
                      this.page = data;
              });
          }

      } catch (e) {
          console.error("Something went wrong with event data. Error was", e);
      }

  }

}
