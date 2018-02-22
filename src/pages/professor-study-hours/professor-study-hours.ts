import * as _ from 'lodash';
import { Moment } from 'moment/moment';

import { Student } from '../../models/student';
import { StudyHour } from '../../models/study_hour';
import * as moment from 'moment/moment';

import { Week } from '../../models/week';
import { StudyHoursService } from '../../providers/study_hours_service';
import { Component } from '@angular/core';
import { AlertController, NavController, ToastController, NavParams } from 'ionic-angular';
import { NewSchedulePage } from '../new-schedule/new-schedule';
import { UpdateSchedulePage } from '../update-schedule/update-schedule';

@Component({
  selector: 'professor-study-hours-page',
  templateUrl: 'professor-study-hours.html'
})

export class ProfessorStudyHoursPage {
  selectedStudent: Student;
  shownWeekday: any;
  weekString: string;
  beginningOfWeek: any;
  endOfWeek: any;
  studyWeek: Week;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private studyHoursService: StudyHoursService) {
      this.selectedStudent = this.navParams.get("selectedStudent")
  }

  ionViewDidEnter(){
    this._setWeekString();
    this.loadStudentStudyHours(this.beginningOfWeek);
  }

  loadStudentStudyHours(date: Moment) {
    this.studyHoursService.getStudyHoursForStudent(this.selectedStudent.id, date).then((week) => {
      this.studyWeek = week;
    });
  }

  addStudyHour() {
    let params: any = {
      selectedStudent: this.selectedStudent,
      date: moment().add("1", "day")
    }
    this.navCtrl.push(NewSchedulePage, params);
  }

  delete(studyHour: StudyHour) {
    let message = `Apagar a tarefa: ${studyHour.description}
                   do(a) ${this.selectedStudent.fullName()}`
    this.showPrompt("Apagar?", message, this.deleteStudyHour.bind(this), null, studyHour);
  }

  deleteStudyHour(studyHour: StudyHour) {
    this.studyHoursService.deleteStudyHour(studyHour.id).then(() => {
      this.showToast(`Study Hour ${studyHour.description} removed`)
      this.loadStudentStudyHours(this.beginningOfWeek);
    });
  }

  edit(studyHour) {
    let params: any = {
      studyHour: studyHour
    }
    this.navCtrl.push(UpdateSchedulePage, params);
  }

  showPrompt(title, message, successCallback, cancelCallback, extraData = {}) {
    let prompt = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            if(_.isFunction(successCallback)) {
              successCallback(extraData);
            }
          }
        },
        {
          text: 'No',
          handler: () => {
            if(_.isFunction(cancelCallback)) {
              cancelCallback(extraData);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  showToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
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

  previousWeek() {
    this.beginningOfWeek.subtract(1, "week");
    this.endOfWeek.subtract(1, "week");
    this.weekString = this.beginningOfWeek.format("DD/MMM") + " - " + this.endOfWeek.format("DD/MMM");
    this.loadStudentStudyHours(this.beginningOfWeek);
  }

  nextWeek() {
    this.beginningOfWeek.add(1, "week");
    this.endOfWeek.add(1, "week");
    this.weekString = this.beginningOfWeek.format("DD/MMM") + " - " + this.endOfWeek.format("DD/MMM");
    this.loadStudentStudyHours(this.beginningOfWeek);
  }
}
