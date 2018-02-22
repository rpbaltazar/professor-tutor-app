import { Student } from '../../models/student';
import { UserService } from '../../providers/user_service';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { ProfessorStudyHoursPage } from '../professor-study-hours/professor-study-hours';

@Component({
  selector: 'student-list-page',
  templateUrl: 'student-list.html'
})
export class StudentListPage {
  students: Array<Student>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserService,
              public menu: MenuController) {
    userService.getStudents().then((students) => {
      this.students = students;
      this.menu.enable(true, 'professor')
      this.menu.enable(false, 'student')
    });
  }

  showStudentHours(student: Student) {
    let params: any = { selectedStudent: student}
    this.navCtrl.push(ProfessorStudyHoursPage, params);
  }
}
