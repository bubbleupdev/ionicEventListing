import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-parking',
  templateUrl: 'parking.html',
})
export class ParkingPage {

  public page: any = null;
  private path: string = "parking";

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, private storage: Storage) {
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

          if (this.page === null) {
              this.storage.get('page-' + this.path).then((data) => {
                  this.page = data;
              });
          }

      } catch (e) {
          console.error("Something went wrong with event data. Error was", e);
      }
  }
}
