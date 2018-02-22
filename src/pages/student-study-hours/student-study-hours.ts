import { StudyHour } from '../../models/study_hour';
import * as moment from 'moment/moment';
import * as _ from 'lodash';
import { Moment } from 'moment/moment';

import { Week } from '../../models/week';
import { StudyHoursService } from '../../providers/study_hours_service';
import { Component } from '@angular/core';
import { AlertController, NavController, ToastController, NavParams, MenuController } from 'ionic-angular';
import { NewSchedulePage } from '../new-schedule/new-schedule';
import { UserService } from '../../providers/user_service';

@Component({
  selector: 'student-study-hours-page',
  templateUrl: 'student-study-hours.html'
})
export class StudentStudyHoursPage {
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
              private userService: UserService,
              public menu: MenuController) {

    this.menu.enable(true, 'student')
    this.menu.enable(false, 'professor')
  }

  ionViewDidEnter(){
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
          text: 'Sim',
          handler: (data) => {
            if(_.isFunction(successCallback)) {
              successCallback(data);
            }
          }
        },
        {
          text: 'Não',
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
    let title = "Marcar como começada?";
    let prompt = `Tens a certeza que queres marcar a tarefa: ${studyHour.description} como começada?`

    let successCallback = function() {
      this.studyHoursService.markAsStarted(studyHour.id).then(() => {
        this.loadStudentWorkload(this.beginningOfWeek);
        this.showToast(`${studyHour.description} começada!`);
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
    let title = "Marcar como terminada?";
    let prompt = `Tens a certeza que queres marcar a tarefa: ${studyHour.description} como terminada?`

    let successCallback = function() {
      this.studyHoursService.markAsCompleted(studyHour.id).then(() => {
        this.loadStudentWorkload(this.beginningOfWeek);
        this.showToast(`${studyHour.description} terminada!`);
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
