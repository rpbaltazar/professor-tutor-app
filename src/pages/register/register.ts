import { LoginService } from '../../providers/login_service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { LoadingController,
         NavController,
         NavParams 
       } from 'ionic-angular';

@Component({
  selector: 'register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  registrationData: FormGroup;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private loginService: LoginService
   ) {
    this.registrationData = new FormGroup({ // TODO: Add validation
      first_name: new FormControl(),
      last_name: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
   });
  }

  register() {
    console.log("Register!")
  }

}