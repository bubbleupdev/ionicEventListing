import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
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
    public navParams: NavParams,
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

          this.loading.dismiss();
        }
      );

      if (this.page === null) {
        this.storage.get('page-' + this.path).then((data) => {
          this.page = data;
          this.replaceHtml(this.page);
          this.loading.dismiss();
        }).catch(error => {
            console.error(error);
            this.loading.dismiss();
          }
        );
      }

    } catch (e) {
      console.error("Something went wrong with event data. Error was", e);
    }
  }

  presentImage() {
    var myImage = "https://s3.amazonaws.com/busites_www/woodlandscenter2016com/pages/meta/1/1/2017_seating_chart_1480437343.jpg";
    // console.log("presentImage");
    // console.log(myImage);
    this.navCtrl.push(ImageZoomPage, {media: myImage});
  }

  /**
   * REPLACE SOME HTML FROM THIS PAGE
   * @param page
   */
  replaceHtml(page) {
    // var html = '<a class="btn btn-primary" data-toggle="modal" href="#seating-chart">Click To Enlarge</a>';
    // var newHtml = '<a class="btn btn-primary" href="#seating-chart" (click)="presentImage()">Click To Enlarge Replaced</a>';
    // var newHtml = '<button full="" ion-button="" class="disable-hover button button-ios button-default button-default-ios button-full button-full-ios activated" ng-reflect-full="" onclick="presentImage()"><span class="button-inner">Click To Enlarge</span><div class="button-effect"></div></button>'
    var html = '<img src="https://s3.amazonaws.com/busites_www/woodlandscenter2016com/pages/meta/1/1/2017_seating_chart_1480437343.jpg" class="img-responsive map-thumbnail" alt="Pavilion Seating Chart" "="">'
    var newHtml = '';
    page.html = page.html.replace(html, newHtml);

    var html2 = 'For more information about season seats, please fill out the following form.';
    var newHtml2 = '';
    page.html = page.html.replace(html2, newHtml2)
  }

}
