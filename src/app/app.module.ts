import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { StudyHoursPage } from '../pages/study-hours/study-hours';
import { StudentListPage } from '../pages/student-list/student-list';
import { NewSchedulePage } from '../pages/new-schedule/new-schedule';

import { StudyHoursService } from '../providers/study_hours_service';
import { UserService } from '../providers/user_service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    StudyHoursPage,
    StudentListPage,
    NewSchedulePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    StudyHoursPage,
    StudentListPage,
    NewSchedulePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    StudyHoursService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
