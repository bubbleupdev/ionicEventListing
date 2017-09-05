import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";
import {Storage} from '@ionic/storage';
import {ImageZoomPage} from "../image-zoom/image-zoom";
import {DomSanitizer} from "@angular/platform-browser";


@IonicPage()
@Component({
  selector: 'page-season-seats',
  templateUrl: 'season-seats.html',
})
export class SeasonSeatsPage {


  public page: any = null;
  private path: string = "season-seats";
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public apiProvider: ApiProvider,
    private storage:Storage,
    public loadingCtrl: LoadingController,
    public domSanitizer: DomSanitizer) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    try {
      this.apiProvider.getPage(this.path).subscribe(
        data => {
          this.page = data;
          this.replaceHtml(this.page);
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
          this.replaceHtml(this.page);
          if(this.loading){
            this.loading.dismiss();
            this.loading = null;
          }
        }).catch(error => {
            console.error(error);
          if(this.loading){
            this.loading.dismiss();
            this.loading = null;
          }
          }
        );
      }

    } catch (e) {
      console.error("Something went wrong with event data. Error was", e);
    }
  }

  presentImage() {
    var myImage = "https://s3.amazonaws.com/busites_www/woodlandscenter2016com/pages/meta/1/1/2017_seating_chart_1480437343.jpg";
    this.navCtrl.push(ImageZoomPage, {media: myImage});
  }

  /**
   * REPLACE SOME HTML FROM THIS PAGE
   * @param page
   */
  replaceHtml(page) {

    var html = '<img src="https://s3.amazonaws.com/busites_www/woodlandscenter2016com/pages/meta/1/1/2017_seating_chart_1480437343.jpg" class="img-responsive map-thumbnail" alt="Pavilion Seating Chart" "="">'
    var newHtml = '';
    page.html = page.html.replace(html, newHtml);

    var html2 = 'For more information about season seats, please fill out the following form.';
    var newHtml2 = '';
    page.html = page.html.replace(html2, newHtml2)
  }

}
