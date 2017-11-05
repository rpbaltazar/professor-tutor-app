import * as _ from 'lodash';

import { Student } from '../models/student';
import { Students } from '../models/students';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Env } from '../config/env';

@Injectable()
export class UserService {
  user_data: any;

  constructor(public http: Http, private storage: Storage) {
    this.http = http;
  }

  signIn(email: string, password: string) {
    let params = {
      email: email,
      password: password
    }

    return new Promise( (resolve, reject) => {
      let mobileApi = Env.getEnvValue('MOBILE_API');

      this.http.post(`${mobileApi}/users/sign_in`, params)
        .subscribe(
          data => {
            this.user_data = data.json();
            this.storage.set("user_type", this.user_data["user_type"]);
            this.storage.set("api_key", this.user_data["api_key"]);
            resolve(this.user_data);
          },
          error => {
            reject(error);
          });
    });
  }

  createUser(data) {
    let params = {
      first_name: data["first_name"],
      last_name: data["last_name"],
      email: data["email"],
      password: data["password"]
    }

    return new Promise( (resolve, reject) => {
      let mobileApi = Env.getEnvValue('MOBILE_API');

      this.http.post(`${mobileApi}/users`, params)
        .subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          });
    });
  }

  getStudents(): Promise<Array<Student>> {
    return new Promise( (resolve, reject) => {
      let mobileApi = Env.getEnvValue('MOBILE_API');

      let headers = new Headers();
      headers.append('Authorization', `Token ${this.user_data["api_key"]}`);
      let opts:RequestOptionsArgs = { headers: headers };

      this.http.get(`${mobileApi}v1/users`, opts)
        .subscribe(
          data => {
            let students: Array<Student> = []
            students = _.map(data.json(), (student) => {
               return Student.fromJSON(student);
            });

            resolve(students);
          },
          error => {
            reject(error);
          });
    });
  }
}
