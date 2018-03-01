import * as moment from 'moment/moment';
import * as momenttz from "moment-timezone"
import * as _ from 'lodash';

import { DateTime } from 'ionic-angular/umd';
import { Moment } from 'moment/moment';
import { Env } from '../config/env';

export class StudyHour {
  id: number;
  user_id: number;
  startTime: Moment;
  endTime: Moment;
  startedAt: DateTime;
  completedAt: DateTime;
  description: string;

  public static fromJSON(json): StudyHour {
    let studyHour: StudyHour = new StudyHour()
    studyHour.id = Number(json["id"]);
    studyHour.user_id = Number(json["user_id"]);
    studyHour.startTime = moment(json["start_time"])
    studyHour.endTime = moment(json["end_time"])
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

  formattedDateTimeInfo(): string {
    return `${this.formattedStartTime()} to ${this.formattedEndTime()}`
  }

  formattedStartTime(): string {
    return this.startTime.format(Env.getEnvValue("DATETIME_FORMAT"));
  }

  formattedEndTime(): string {
    return this.endTime.format(Env.getEnvValue("DATETIME_FORMAT"))
  }
}
