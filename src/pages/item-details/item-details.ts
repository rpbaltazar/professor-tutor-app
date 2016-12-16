import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { NewSchedulePage } from '../new-schedule/new-schedule';


@Component({
  selector: 'item-details-page',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedStudent: any;
  weeklySchedule: Array<{title: string, schedule: string[]}>;
  shownWeekday: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedStudent = navParams.get('item');
    this.weeklySchedule = [
      { title: 'Segunda', schedule: ['Matematica 10-11'] },
      { title: 'Terca',   schedule: [] },
      { title: 'Quarta',  schedule: [] },
      { title: 'Quinta',  schedule: [] },
      { title: 'Sexta',   schedule: [] },
      { title: 'Sabado',  schedule: [] },
      { title: 'Domingo', schedule: [] }
    ];
  }

  itemTapped(event, item) {
    console.log(arguments);
  }

  isWeekdayShown(weekday) {
    return this.shownWeekday == weekday;
  }

  toggleWeekday(weekday) {
    if (this.isWeekdayShown(weekday)) {
      this.shownWeekday = null;
    }
    else {
      this.shownWeekday = weekday;
    }
  }

  addNewHour(event) {
    this.navCtrl.push(NewSchedulePage, {
      selectedStudent: this.selectedStudent
    });
  }

  previousWeek(event) {
    // Calculate beginning and end of previous week
    // this._updatePage(currentWeek);
  }

  nextWeek(event) {
    // Calculate beginning and end of next week
    // this._updatePage(currentWeek);
  }

  _updatePage(currentWeek) {
    this._updateBottomNavBar(currentWeek);
    // Fetch user data for currentweek
  }

  _updateBottomNavBar(){

  }
}
