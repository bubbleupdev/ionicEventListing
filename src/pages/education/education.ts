import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";
import {Storage} from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-education',
  templateUrl: 'education.html',
})
export class EducationPage {

  public page: any = null;
  private path: string = "education";
  public loading: Loading;

  constructor(
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
          if(this.loading){
            this.loading.dismiss();
            this.loading = null;
          }
        }
      );

      if(this.page===null){
        this.storage.get('page-' + this.path).then((data) => {
          this.page = data;
          if(this.loading){
            this.loading.dismiss();
            this.loading = null;
          }
        });
      }

    } catch (e) {
      console.error("Something went wrong with event data. Error was", e);
    }

  }

}
