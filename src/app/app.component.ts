import {Component, ViewChild} from '@angular/core';
import {AlertController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SeasonSeatsPage} from "../pages/season-seats/season-seats";
import {TabsPage} from "../pages/tabs/tabs";
import {Push, PushObject, PushOptions} from '@ionic-native/push';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = TabsPage;
  public pages: Array<{ title: string, component: any, icon: any }>;
  public pushObject: PushObject;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController,
              public push: Push) {

    this.pages = [
      // {title: 'Events', component: TabsPage, icon: 'calendar'},
      // {title: 'Directions', component: DirectionsPage, icon: 'compass'},
      // {title: 'Parking', component: ParkingPage, icon: 'car'},
      // {title: 'Maps', component: MapsPage, icon: 'map'},
      // {title: 'Rules', component: RulesPage, icon: 'information-circle'},
      {title: 'Season Seats', component: SeasonSeatsPage, icon: 'calendar'},
      // {title: 'Mission', component: MissionPage, icon: ''},
      // {title: 'About', component: AboutPage, icon: ''},
      // {title: 'Education', component: EducationPage, icon: 'information-circle'},
    ];

    const options: PushOptions = {
      android: {
        senderID: '406620653991'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    this.pushObject = this.push.init(options);

    platform.ready().then(() => {
      statusBar.styleLightContent();
      this.pushsetup();
    });

  }

  /**
   * This opens specific page
   * @param page
   */
  openPage(page) {
    this.nav.push(page.component);
  }

  /**
   * Thi Completes Push Setup
   */
  pushsetup() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }

    this.pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let pushAlert = this.alertCtrl.create({
          title: notification.title,
          message: notification.message
        });
        pushAlert.present();
      }
    });

    this.pushObject.on('registration').subscribe((registration: any) => {
      // console.dir(registration);
      //do whatever you want with the registration ID
    });

    this.pushObject.on('error').subscribe(error =>
      console.error('Error with Push plugin ' + error)
    );


  }

  checkPushPermissions(){
    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });
  }


  togglePush() {
    this.pushObject.unregister().then(
      (data:any)=>console.dir({data:data,message:"Unregistered"})
    );
    this.push.hasPermission().then(
      (res:any)=>console.log(res)
    );
  }
}

