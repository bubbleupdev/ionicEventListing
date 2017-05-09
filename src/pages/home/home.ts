import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventsService } from '../../providers/events-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [EventsService]
})
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
