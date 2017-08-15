import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
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
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public apiProvider: ApiProvider
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    try {
      this.apiProvider.getPage(this.path).subscribe(
        data => {
          this.page = data;
          this.storage.set('page-' + this.path, data).then(
            () => console.log("Stored Data " + 'page-' + this.path),
            error => console.error('Failed to store Data page-' + this.path)
          );
          this.loading.dismiss();
        }
      );

      if(this.page===null){
        this.storage.get('page-' + this.path).then((data) => {
          this.page = data;
          this.loading.dismiss()
        });
      }

    } catch (e) {
      console.error("Something went wrong with event data. Error was", e);
    }

  }

}
