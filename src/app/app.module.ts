import { RegisterPage } from '../pages/register/register';
import { LoginService } from '../providers/login_service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { NewSchedulePage } from '../pages/new-schedule/new-schedule';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    ItemDetailsPage,
    ListPage,
    NewSchedulePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    ItemDetailsPage,
    ListPage,
    NewSchedulePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
