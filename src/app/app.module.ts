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
import { UserService } from '../providers/user_service';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { StudentListPage } from '../pages/student-list/student-list';
import { NewSchedulePage } from '../pages/new-schedule/new-schedule';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    ItemDetailsPage,
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
    ItemDetailsPage,
    StudentListPage,
    NewSchedulePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
