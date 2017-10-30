import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { StudentListPage } from '../pages/student-list/student-list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
              public menu: MenuController, 
              private splashScreen: SplashScreen,
              private statusBar: StatusBar) {
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
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
