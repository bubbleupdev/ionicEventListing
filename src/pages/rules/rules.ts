import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-rules',
  templateUrl: 'rules.html',
})
export class RulesPage {

  public page: any = null;
  private path:string ="pavilion-rules";
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiProvider: ApiProvider,
    public loadingCtrl: LoadingController,
    private storage: Storage
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

      if (this.page === null) {
        this.storage.get('page-' + this.path).then((data) => {
          this.page = data;
          if(this.loading){
            this.loading.dismiss();
            this.loading = null;
          }
        }).catch(error=>{
          alert("No Network");
          if(this.loading){
            this.loading.dismiss();
            this.loading = null;
          }
        });
      }

    } catch (e) {
      if(this.loading){
        this.loading.dismiss();
        this.loading = null;
      }
      console.error("Something went wrong with event data. Error was", e);
    }
  }

}
