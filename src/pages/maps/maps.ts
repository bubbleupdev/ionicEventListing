import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";
import {ImageViewerController} from "ionic-img-viewer";
import {ImageZoomPage} from "../image-zoom/image-zoom";
import {PhotoViewer} from '@ionic-native/photo-viewer';
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiProvider: ApiProvider,
              private photoViewer: PhotoViewer,
              private platform: Platform,
              public domSanitizer: DomSanitizer,
              public loadingCtrl: LoadingController,
              imageViewerCtrl: ImageViewerController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this._imageViewerCtrl = imageViewerCtrl;

    this.mapImages = [
      {title: 'SITE MAP', image: "assets/images/maps/2017-cwmp-map-01.svg"},
      {title: 'SEATING CHART', image: "assets/images/maps/seating-map-public-01.svg"},
      {title: 'PUBLIC PARKING & <br /> PATHWAYS MAP', image: "assets/images/maps/public-parking-and-pathways-map-01.svg"},
    ];
    this.loading.dismiss();

    /*this.apiProvider.getPage(this.path).subscribe(
        data => {
          this.page = data;
          console.log(this.page);
        }
    );*/
  }

  presentImage(myImage) {
    console.log("presentImage");
    console.log(myImage);
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
    // if(this.platform.is('android') || this.platform.is('ios')) {
    //     this.photoViewer.show(myImage);
    // } else {
    //     this.navCtrl.push(ImageZoomPage, {media: myImage});
    // }

  }

}
