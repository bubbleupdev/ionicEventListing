import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController} from 'ionic-angular';
import {ImageViewerController} from "ionic-img-viewer";
import {DomSanitizer} from "@angular/platform-browser";


@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  _imageViewerCtrl: ImageViewerController;
  public mapImages:any;
  public page: any;
  // private path: string = "venue-maps";
  public loading: Loading;

  constructor(
              public domSanitizer: DomSanitizer,
              public loadingCtrl: LoadingController,
              imageViewerCtrl: ImageViewerController
  ) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this._imageViewerCtrl = imageViewerCtrl;

    this.mapImages = [
      {title: 'VENUE MAP', image: "https://s3.amazonaws.com/busites-www/woodlandscenterapp/maps/2017-cwmp-map-01.svg"},
      {title: 'SEATING CHART', image: "https://s3.amazonaws.com/busites-www/woodlandscenterapp/maps/seating-map-public-01.svg"},
      {title: 'PUBLIC PARKING & <br /> PATHWAYS MAP', image: "https://s3.amazonaws.com/busites-www/woodlandscenterapp/maps/public-parking-and-pathways-map-01.svg"},
    ];

    setTimeout(() => {
      if(this.loading){
        this.loading.dismiss();
        this.loading = null;
      }
    }, 200);
  }

  presentImage(myImage) {
    console.log("presentImage");
    console.log(myImage);
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

}
