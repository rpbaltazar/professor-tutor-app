import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { NewSchedulePage } from '../new-schedule/new-schedule';


@Component({
  selector: 'item-details-page',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  weekDays: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.weekDays = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];
  }

  itemTapped(event, item) {
    console.log(arguments);
  }

  addNewHour(event) {
    this.navCtrl.push(NewSchedulePage);
  }
}
