import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api-provider";
import {ImageViewerController} from "ionic-img-viewer";

/**
 * Generated class for the MapsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
    _imageViewerCtrl: ImageViewerController;
    public mapImages:any;
    public page: any;
    private path: string = "venue-maps";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public apiProvider: ApiProvider,
              imageViewerCtrl: ImageViewerController) {
      this._imageViewerCtrl = imageViewerCtrl;
      this.mapImages = [
          {title: 'SITE MAP', image: "assets/images/maps/site_mapnew_logo.jpg"},
          {title: 'SEATING CHART', image: "assets/images/maps/seating-chart.jpg"},
          {title: 'PUBLIC PARKING AND PATHWAYS MAP', image: "assets/images/maps/Public-Parking-and-Pathways-Map.jpg"},
      ];
    /*this.apiProvider.getPage(this.path).subscribe(
        data => {
          this.page = data;
          console.log(this.page);
        }
    );*/
  }

    presentImage(myImage) {
        const imageViewer = this._imageViewerCtrl.create(myImage);
        imageViewer.present();
    }

}
