import { RegisterPage } from '../register/register';
import { UserService } from '../../providers/user_service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { LoadingController,
         NavController,
         NavParams 
       } from 'ionic-angular';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginData: FormGroup;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private userService: UserService
   ) {
    this.loginData = new FormGroup({ // TODO: Add validation
      email: new FormControl(),
      password: new FormControl()
   });

  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    var emailAddress = this.loginData.get("email").value
    var password = this.loginData.get("password").value
    this.userService.signIn(emailAddress, password).then(data => {
      console.log(data);
    }).catch( () => {
      console.log("Error with login") // TODO: Show notification
    });
  }
}
