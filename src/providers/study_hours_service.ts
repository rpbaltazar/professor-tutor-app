import { Day } from '../models/day';
import * as _ from 'lodash';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Env } from '../config/env';

@Injectable()
export class StudyHoursService {
  apiKeyPromise: Promise<any>;
  api_key: any;

  constructor(public http: Http, private storage: Storage) {
    this.apiKeyPromise = storage.get("api_key").then((api_key) => {
      this.api_key = api_key
    });
  }

  getStudyHoursForWeek(): Promise<Array<Day>> {
    return new Promise( (resolve, reject) => {
      this.apiKeyPromise.then(() => {
        let mobileApi = Env.getEnvValue('MOBILE_API');

        let headers = new Headers();
        headers.append('Authorization', `Token ${this.api_key}`);
        let opts:RequestOptionsArgs = { headers: headers };

        this.http.get(`${mobileApi}v1/study_hours`, opts)
            .subscribe((data) => {
              resolve(Day.fromJSON(data.json()));
          }, (error) => {
            reject(error);
        });
      });
    });
  }
}
