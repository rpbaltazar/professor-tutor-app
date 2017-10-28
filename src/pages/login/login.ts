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
   ) {
    this.loginData = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
   });

  }

  login() {
    var emailAddress = this.loginData.get("email").value
    var password = this.loginData.get("password").value
    console.log("logging in using " + emailAddress + " and " + password);
  }
}