import * as moment from 'moment/moment';
import * as _ from 'lodash';

import { DateTime } from 'ionic-angular/umd';
import { Moment } from 'moment/moment';
import { Env } from '../config/env';

export class StudyHour {
  id: Number;
  user_id: Number;
  startTime: Moment;
  endTime: Moment;
  startedAt: DateTime;
  completedAt: DateTime;
  description: String;

  public static fromJSON(json): StudyHour {
    let studyHour: StudyHour = new StudyHour()
    studyHour.id = Number(json["id"]);
    studyHour.user_id = Number(json["user_id"]);
    studyHour.startTime = moment(json["start_time"]);
    studyHour.endTime = moment(json["end_time"]);
    studyHour.startedAt = json["started_at"];
    studyHour.completedAt = json["completed_at"];
    studyHour.description = json["description"];
    return studyHour;
  }

  isStarted(): boolean {
    return !_.isEmpty(this.startedAt);
  }

  isComplete(): boolean {
    return !_.isEmpty(this.completedAt);
  }

  durationInMinutes(): number {
    return this.endTime.diff(this.startTime, 'minutes')
  }

  formattedDateTimeInfo(): String {
    return `${this.formattedStartTime()} to ${this.formattedEndTime()}`
  }

  formattedStartTime(): String {
    return this.startTime.format(Env.getEnvValue("DATETIME_FORMAT"));
  }
  
  formattedEndTime(): String {
    return this.endTime.format(Env.getEnvValue("DATETIME_FORMAT"))
  }
}