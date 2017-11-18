import { StudentStudyHoursPage } from '../student-study-hours/student-study-hours';
import { StudentListPage } from '../student-list/student-list';
import { RegisterPage } from '../register/register';
import { UserService } from '../../providers/user_service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginData: FormGroup;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private userService: UserService
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
        this.navCtrl.push(StudentListPage);
      } else {
        this.navCtrl.push(StudentStudyHoursPage);
      }
    }).catch( () => {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Incorrect username or password!',
        buttons: ['Ok']
      });
      alert.present();
    });
  }
}
