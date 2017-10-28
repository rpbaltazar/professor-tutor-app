import { Component } from "@angular/core";
import { ToastController, NavController, NavParams } from "ionic-angular";

@Component({
  selector: "new-schedule-page",
  templateUrl: "new-schedule.html"
})

export class NewSchedulePage {

  selectedStudent: any;
  weekBeginning: string;
  weekEnd: string;
  startDate: string;
  endDate: string;
  task: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.selectedStudent = navParams.get('selectedStudent');
    this.weekBeginning = this._newScheduleBeginning();
    // TODO:
    // Find a way to update the min date of end time
  }

  saveEvent(event){
    // TODO:
    // validate form
    // send request with data
    this.presentToast();
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

  _newScheduleBeginning() {
    //let today = new Date();
    //parse date into right format
    return "2016-12-11";
    //return today.toISOString();
  }
}
