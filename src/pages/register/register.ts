import { LoginPage } from '../login/login';
import { UserService } from '../../providers/user_service';
import { AlertController } from 'ionic-angular';
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
    public alertCtrl: AlertController,
    private userService: UserService
   ) {
    this.registrationData = new FormGroup({ // TODO: Add validation
      first_name: new FormControl(),
      last_name: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
   });
  }

  register() {
    const loadingMessage = this.loadingCtrl.create({
      content: 'Creating user...'
    });

    var params = {
      first_name: this.registrationData.get("first_name").value,
      last_name: this.registrationData.get("last_name").value,
      email: this.registrationData.get("email").value,
      password: this.registrationData.get("password").value,
    }

    this.userService.createUser(params).then(() => {
      loadingMessage.dismiss();

        const alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'User was created successfully. Please login',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.navCtrl.push(LoginPage);
            }
          }]
        });

        alert.present();
      });
  }

  presentToast() {
  }


}
