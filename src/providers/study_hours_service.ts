import * as _ from 'lodash';
import moment, { Moment } from 'moment';
import { Week } from '../models/week';

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
    this.storage = storage;
  }

  getStudyHoursForWeek(date = moment()): Promise<Week> {
    return new Promise( (resolve, reject) => {
      this.storage.get("api_key").then((apiKey) => {
        let mobileApi = Env.getEnvValue('MOBILE_API');

        let headers = new Headers();
        headers.append('Authorization', `Token ${apiKey}`);

        let params = {
          date: date.format()
        }

        let opts:RequestOptionsArgs = { headers: headers, params: params };

        this.http.get(`${mobileApi}v1/study_hours`, opts)
            .subscribe((data) => {
              resolve(Week.fromJSON(data.json()));
          }, (error) => {
            reject(error);
        });
      });
    });
  }

  getStudyHoursForStudent(studentId: number, date = moment()) : Promise<Week> {
    return new Promise( (resolve, reject) => {
      this.storage.get("api_key").then((apiKey) => {
        let mobileApi = Env.getEnvValue('MOBILE_API');

        let headers = new Headers();
        headers.append('Authorization', `Token ${apiKey}`);

        let params = {
          date: date.format()
        }

        let opts:RequestOptionsArgs = { headers: headers, params: params };

        this.http.get(`${mobileApi}v1/study_hours/${studentId}`, opts)
            .subscribe((data) => {
              resolve(Week.fromJSON(data.json()));
          }, (error) => {
            reject(error);
        });
      });
    });
  }

  markAsStarted(studyHourId) {
    return new Promise( (resolve, reject) => {
      this.storage.get("api_key").then((apiKey) => {
        let mobileApi = Env.getEnvValue('MOBILE_API');

        let headers = new Headers();
        headers.append('Authorization', `Token ${apiKey}`);

        let opts:RequestOptionsArgs = { headers: headers };

        this.http.post(`${mobileApi}v1/study_hours/${studyHourId}/mark_as_started`, {}, opts)
            .subscribe((data) => {
              resolve(data.json());
          }, (error) => {
            reject(error);
        });
      });
    });
  }

  markAsCompleted(studyHourId) {
    return new Promise( (resolve, reject) => {
      this.storage.get("api_key").then((apiKey) => {
        let mobileApi = Env.getEnvValue('MOBILE_API');

        let headers = new Headers();
        headers.append('Authorization', `Token ${apiKey}`);

        let opts:RequestOptionsArgs = { headers: headers };

        this.http.post(`${mobileApi}v1/study_hours/${studyHourId}/mark_as_finished`, {}, opts)
            .subscribe((data) => {
              resolve(data.json());
          }, (error) => {
            reject(error);
        });
      });
    });
  }

  createNewStudyHour(data): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.storage.get("api_key").then((apiKey) => {
        let mobileApi = Env.getEnvValue('MOBILE_API');

        let headers = new Headers();
        headers.append('Authorization', `Token ${apiKey}`);

        let params = {
          study_hour: {
            user_id: data["student_id"],
            start_time: data["start_time"],
            end_time: data["end_time"],
            description: data["description"]
          }
        }

        let opts:RequestOptionsArgs = { headers: headers };

        this.http.post(`${mobileApi}v1/study_hours`, params, opts)
            .subscribe((data) => {
              resolve();
          }, (error) => {
            reject(error);
        });
      });
    });
  }

  updateStudyHour(data): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.apiKeyPromise.then(() => {
        let mobileApi = Env.getEnvValue('MOBILE_API');

        let headers = new Headers();
        headers.append('Authorization', `Token ${this.api_key}`);

        let params = {
          study_hour: {
            start_time: data["start_time"],
            end_time: data["end_time"],
            description: data["description"]
          }
        }

        let opts:RequestOptionsArgs = { headers: headers };

        this.http.put(`${mobileApi}v1/study_hours/${data["id"]}`, params, opts)
            .subscribe((data) => {
              resolve();
          }, (error) => {
            reject(error);
        });
      });
    });
  }

  deleteStudyHour(id): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.apiKeyPromise.then(() => {
        let mobileApi = Env.getEnvValue('MOBILE_API');

        let headers = new Headers();
        headers.append('Authorization', `Token ${this.api_key}`);

        let opts:RequestOptionsArgs = { headers: headers };

        this.http.delete(`${mobileApi}v1/study_hours/${id}`, opts)
            .subscribe((data) => {
              resolve();
          }, (error) => {
            reject(error);
        });
      });
    });
  }
}
