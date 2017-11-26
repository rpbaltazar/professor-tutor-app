import { StudentStudyHoursPage } from '../pages/student-study-hours/student-study-hours';
import moment from 'moment';

import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { StudentListPage } from '../pages/student-list/student-list';
import { Env } from '../config/env';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;
  constructor(public platform: Platform, 
              public menu: MenuController, 
              private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private storage: Storage) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Os Meus Alunos', component: StudentListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.setConfiguration();
      this.checkExistingLogin();
    });
  }

  async checkExistingLogin() {
    let apiKey = await this.storage.get("api_key")
    let userType = await this.storage.get("user_type")

    if (apiKey && userType) {
      if(userType == "Professor") {
        this.nav.push(StudentListPage);
      } else {
        this.nav.push(StudentStudyHoursPage);
      }
    }
  }

  setConfiguration() {
    moment.locale(Env.getEnvValue("LOCALE"));
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
