import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedStudent = navParams.get('selectedStudent');
    this.weekBeginning = this._newScheduleBeginning();
    // TODO:
    // Find a way to update the min date of end time
  }

  saveEvent(event){
    // TODO:
    // validate form
    // send request with data
    // feedback success
    console.log(arguments);
    this.navCtrl.pop();
  }

  _newScheduleBeginning() {
    //let today = new Date();
    //parse date into right format
    return "2016-12-11";
    //return today.toISOString();
  }
}
