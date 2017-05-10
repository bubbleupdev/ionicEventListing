import {
  NavController,
  ModalController
} from 'ionic-angular';

import {
  Component
} from '@angular/core';
import {
  Events
} from '../../providers/events'
/*
import {
  DetailPage
} from '../detail/detail'
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Events]
})

export class HomePage {
  public events = [];
  public shouldReorder = false;
  constructor(
    public navCtrl: NavController,
    public service: Events,
    public modalCtrl: ModalController
  ) {
    this.service.getEvents()
      .subscribe(
      data => this.events = data
      )
  }
  doInfinite(e) {
    this.service.getEvents()
      .subscribe(
      data => this.events.push(...data),
      err => console.log(err),
      () => e.complete()
      )
  }
  doRefresh(e) {
    this.service.getEvents()
      .subscribe(
      data => this.events.unshift(...data),
      err => console.log(err),
      () => e.complete()
      )
  }
  toggleReorder() {
    this.shouldReorder = !this.shouldReorder
  }

  pushPage(user) {
    // this.modalCtrl.create(DetailPage, user).present()
    //this.navCtrl.push(DetailPage, user)
    // this.navCtrl.setPages([
    //   {page: HomePage},
    //   {page: DetailPage, params: this.events[5]},
    //   {page: HomePage},
    //   {page: DetailPage, params: user}
    // ])
  }
}

/*
export class HomePage {

  public icons;
  public items;

  constructor(public navCtrl: NavController, public eventsService: EventsService) {
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService.load()
    .then(data => {
      this.items = data;
    });
  }

}
*/