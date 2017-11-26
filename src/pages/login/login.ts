import { StudentListPage } from '../student-list/student-list';
import { RegisterPage } from '../register/register';
import { UserService } from '../../providers/user_service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfessorStudyHoursPage } from '../professor-study-hours/professor-study-hours';
import { StudentStudyHoursPage } from '../student-study-hours/student-study-hours';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginData: FormGroup;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private userService: UserService,
    private storage: Storage
   ) {
    this.loginData = new FormGroup({ // TODO: Add validation
      email: new FormControl("ranhiru@gmail.com"),
      password: new FormControl("12345678")
   });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    var emailAddress = this.loginData.get("email").value
    var password = this.loginData.get("password").value
    this.userService.signIn(emailAddress, password).then(data => {

      if(this.userService.isProfessor()) {
        this.navCtrl.setRoot(StudentListPage);
      } else {
        this.navCtrl.setRoot(StudentStudyHoursPage);
      }
    }).catch( (error) => {
      let message = ""

      if (error.status == 401) {
        message = 'Incorrect username or password!'
      } else if(error.status == 0) {
        message = "No internet connection!"
      } else {
        message = "Server Error"
      }

      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: message,
        buttons: ['Ok']
      });
      alert.present();
    });
  }
}
