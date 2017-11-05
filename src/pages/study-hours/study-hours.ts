import { StudyHoursService } from '../../providers/study_hours_service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewSchedulePage } from '../new-schedule/new-schedule';
import * as moment from 'moment/moment';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private studyHoursService: StudyHoursService) {

    this.load()
  }

  load(){
    this.loadStudentWorkload();
    this._setWeekString();
  }

  loadStudentWorkload() {
    this.studyHoursService.getStudyHoursForWeek().then((studyHours) => {
      debugger
    });
  }

  _setWeekString() {
    let today = moment();
    this.beginningOfWeek = today.clone().startOf("isoWeek");
    this.endOfWeek = today.clone().endOf("isoWeek");
    this.weekString = this.beginningOfWeek.format("DD/MMM") + " - " + this.endOfWeek.format("DD/MMM");
  }

  itemTapped(event, item) {
    console.log(arguments);
  }

  itemDelete(item) {
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
    this.beginningOfWeek.subtract(1, "week");
    this.endOfWeek.subtract(1, "week");
    this.weekString = this.beginningOfWeek.format("DD/MMM") + " - " + this.endOfWeek.format("DD/MMM");
    // this._updatePage(currentWeek);
  }

  nextWeek(event) {
    this.beginningOfWeek.add(1, "week");
    this.endOfWeek.add(1, "week");
    this.weekString = this.beginningOfWeek.format("DD/MMM") + " - " + this.endOfWeek.format("DD/MMM");
    // this._updatePage(currentWeek);
  }

  _updatePage(currentWeek) {
    this._updateBottomNavBar(currentWeek);
    // Fetch user data for currentweek
  }

  _updateBottomNavBar(currentWeek){

  }
}
