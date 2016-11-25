import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "new-schedule-page",
  templateUrl: "new-schedule.html"
})

export class NewSchedulePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
