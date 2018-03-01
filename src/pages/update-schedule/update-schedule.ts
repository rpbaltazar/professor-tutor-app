import { StudyHour } from '../../models/study_hour';
import * as moment from 'moment/moment';
import * as _ from 'lodash';

import { FormGroup, FormControl } from '@angular/forms';
import { Component } from "@angular/core";
import { ToastController, NavController, NavParams } from "ionic-angular";
import { StudyHoursService } from '../../providers/study_hours_service';

@Component({
  selector: "update-schedule-page",
  templateUrl: "update-schedule.html"
})

export class UpdateSchedulePage {
  currentStudyHour: StudyHour;
  updateScheduleData: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public studyHourService: StudyHoursService) {

    this.currentStudyHour = navParams.get("studyHour");

    let startDate = this.currentStudyHour.startTime.format();
    let endDate = this.currentStudyHour.endTime.format();
    let description = this.currentStudyHour.description;

    this.updateScheduleData = new FormGroup({
      startDate: new FormControl(startDate),
      endDate: new FormControl(endDate),
      assignment: new FormControl(description)
   });
  }

  updateStudyHour(){
    let data = {
      id: this.currentStudyHour.id,
      start_time: this.updateScheduleData.get("startDate").value,
      end_time: this.updateScheduleData.get("endDate").value,
      description: this.updateScheduleData.get("assignment").value,
    }

    this.studyHourService.updateStudyHour(data).then( () => {
      this.presentToast();
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Atualizado com sucesso',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });

    toast.present();
  }
}
