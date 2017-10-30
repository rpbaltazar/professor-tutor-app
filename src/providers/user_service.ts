import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Env } from '../config/env';

@Injectable()
export class UserService {
  data: any;

  constructor(public http: Http) {
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
            this.data = data.json();
            resolve(this.data);
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
            this.data = data.json();
            resolve(this.data);
          },
          error => {
            reject(error);
          });
    });

  }

}
