import { StudyHour } from '../../models/study_hour';
import * as moment from 'moment/moment';
import * as _ from 'lodash';
import { Moment } from 'moment/moment';

import { Week } from '../../models/week';
import { StudyHoursService } from '../../providers/study_hours_service';
import { Component } from '@angular/core';
import { AlertController, NavController, ToastController, NavParams } from 'ionic-angular';
import { NewSchedulePage } from '../new-schedule/new-schedule';
import { UserService } from '../../providers/user_service';

@Component({
  selector: 'student-study-hours-page',
  templateUrl: 'student-study-hours.html'
})

export class StudentStudyHoursPage {
  selectedStudent: any;
  shownWeekday: any;
  weekString: string;
  beginningOfWeek: any;
  endOfWeek: any;
  studyWeek: Week;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private studyHoursService: StudyHoursService,
              private userService: UserService) {
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

  showPrompt(title, message, successCallback, cancelCallback) {
    let prompt = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Yes',
          handler: (data) => {
            if(_.isFunction(successCallback)) {
              successCallback(data);
            }
          }
        },
        {
          text: 'No',
          handler: (data) => {
            if(_.isFunction(cancelCallback)) {
              cancelCallback(data);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
  }

  markAsStarted(studyHour: StudyHour) {
    let title = "Mark As Started ?";
    let prompt = `Are you sure you want to mark ${studyHour.description} as started ?`

    let successCallback = function() {
      this.studyHoursService.markAsStarted(studyHour.id).then(() => {
        this.loadStudentWorkload(this.beginningOfWeek);
        this.showToast(`${studyHour.description} marked as started!`);
      });
    }.bind(this)

    this.showPrompt(
      title,
      prompt,
      successCallback,
      null
    );
  }

  markStudyHourAsCompleted(studyHour) {
    let title = "Mark As Completed ?";
    let prompt = `Are you sure you want to mark ${studyHour.description} as completed ?`

    let successCallback = function() {
      this.studyHoursService.markAsCompleted(studyHour.id).then(() => {
        this.loadStudentWorkload(this.beginningOfWeek);
        this.showToast(`${studyHour.description} marked as completed!`);
      });
    }.bind(this);

    this.showPrompt(
      title, 
      prompt,
      successCallback,
      null
    );
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
}
