import * as moment from 'moment/moment';
import * as _ from 'lodash';

import { FormGroup, FormControl } from '@angular/forms';
import { Component } from "@angular/core";
import { ToastController, NavController, NavParams } from "ionic-angular";
import { StudyHoursService } from '../../providers/study_hours_service';
import { Moment } from 'moment-timezone';

@Component({
  selector: "new-schedule-page",
  templateUrl: "new-schedule.html"
})

export class NewSchedulePage {
  newScheduleData: FormGroup;
  selectedStudent: any;
  today: String = moment().format();
  weekEnd: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public studyHourService: StudyHoursService) {
    this.selectedStudent = navParams.get('selectedStudent');
    
    let startDate = navParams.get("date").format()
    let endDate = navParams.get("date").clone().add(1, "h").format()

    this.newScheduleData = new FormGroup({
      startDate: new FormControl(startDate),
      endDate: new FormControl(endDate),
      assignment: new FormControl()
   });
  }

  saveStudyHour(){
    let data = {
      student_id: this.selectedStudent.id,
      start_time: moment(this.newScheduleData.get("startDate").value).format("YYYY-MM-DD HH:mm:ss"),
      end_time: moment(this.newScheduleData.get("endDate").value).format("YYYY-MM-DD HH:mm:ss"),
      description: this.newScheduleData.get("assignment").value,
    }

    this.studyHourService.createNewStudyHour(data).then( () => {
      this.presentToast();
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Registado com sucesso',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });

    toast.present();
  }
}
