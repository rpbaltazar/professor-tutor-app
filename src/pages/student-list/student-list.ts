import { UserService } from '../../providers/user_service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'student-list-page',
  templateUrl: 'student-list.html'
})
export class StudentListPage {
  selectedItem: any;
  items: Array<{title: string, note: string, icon: string}>;
  students: string[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userService: UserService) {

      userService.getStudents().then((students) => {
        debugger
      });
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  loadStudents() {
    this.students = ['Maria', 'Joao', 'Francisco', 'Rui', 'Manuela'];
  }
}
