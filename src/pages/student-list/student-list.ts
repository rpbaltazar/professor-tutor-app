import { Student } from '../../models/student';
import { UserService } from '../../providers/user_service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'student-list-page',
  templateUrl: 'student-list.html'
})
export class StudentListPage {
  students: Array<Student>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userService: UserService) {

      userService.getStudents().then((students) => {
        this.students = students;
      });
  }

  showStudentHours(student: Student) {
    console.log("Show student " + student.id);
  }
}
