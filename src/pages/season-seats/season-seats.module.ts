import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeasonSeatsPage } from './season-seats';

@NgModule({
  declarations: [
    SeasonSeatsPage,
  ],
  imports: [
    IonicPageModule.forChild(SeasonSeatsPage),
  ],
  exports: [
    SeasonSeatsPage
  ]
})
export class SeasonSeatsPageModule {}
