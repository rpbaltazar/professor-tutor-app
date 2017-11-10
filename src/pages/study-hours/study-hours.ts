import * as moment from 'moment/moment';
import { Moment } from 'moment/moment';

import { Week } from '../../models/week';
import { StudyHoursService } from '../../providers/study_hours_service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewSchedulePage } from '../new-schedule/new-schedule';

@Component({
  selector: 'study-hours-page',
  templateUrl: 'study-hours.html'
})

export class StudyHoursPage {
  selectedStudent: any;
  shownWeekday: any;
  weekString: string;
  beginningOfWeek: any;
  endOfWeek: any;
  studyWeek: Week;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private studyHoursService: StudyHoursService) {

    this.load()
  }

  load(){
    this._setWeekString();
    this.loadStudentWorkload(this.beginningOfWeek);
  }

  loadStudentWorkload(date: Moment) {
    this.studyHoursService.getStudyHoursForWeek(date).then((week) => {
      this.studyWeek = week;
    });
  }

  _setWeekString() {
    let today = moment();
    this.beginningOfWeek = today.clone().startOf("isoWeek");
    this.endOfWeek = today.clone().endOf("isoWeek");
    this.weekString = `${this.beginningOfWeek.format("DD/MMM")}  -  ${this.endOfWeek.format("DD/MMM")}`;
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

  previousWeek() {
    this.beginningOfWeek.subtract(1, "week");
    this.endOfWeek.subtract(1, "week");
    this.weekString = this.beginningOfWeek.format("DD/MMM") + " - " + this.endOfWeek.format("DD/MMM");
    this._updatePage();
  }

  nextWeek() {
    this.beginningOfWeek.add(1, "week");
    this.endOfWeek.add(1, "week");
    this.weekString = this.beginningOfWeek.format("DD/MMM") + " - " + this.endOfWeek.format("DD/MMM");
    this._updatePage();
  }

  _updatePage() {
    this.loadStudentWorkload(this.beginningOfWeek);
  }

  _updateBottomNavBar(currentWeek){

  }
}
