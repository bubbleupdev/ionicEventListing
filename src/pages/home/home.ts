import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Events} from "../../providers/events";
import {DetailPage} from "../detail-page/detail-page";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
	providers: [Events]
})
export class HomePage {
	public events = [];
	public shouldReorder = false;

	constructor(public navCtrl: NavController,
				public navparams: NavParams,
				public service: Events,
				public modalCtrl: ModalController) {
		console.log("home ts");
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

	formatDate(event) {
		var date = new Date(event.at + ' UTC');

		var monthNames = [
			"January", "February", "March",
			"April", "May", "June", "July",
			"August", "September", "October",
			"November", "December"
		];

		var day = date.getDate();
		var monthIndex = date.getMonth();
		var dayIndex = date.getDay();

		var dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dayIndex];

		return dayOfWeek + ' ' + monthNames[monthIndex] + ' ' + day;

	}

	openUrl(path) {
		window.open(path, '_system');
	}

	openWebsiteUrl(path) {
		this.navCtrl.push(DetailPage,{id:path});

		// window.open('https://woodlandscenter.dev.busites.com/' + path, '_system');
	}

}
