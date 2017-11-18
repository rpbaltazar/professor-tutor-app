import { Week } from './week';
import { StudyHour } from './study_hour';
import * as _ from 'lodash';

export class Day {
  dayOfWeek: number;
  studyHours: Array<StudyHour>

  public getDayName(): string {
    return Week.getNameOfDay(this.dayOfWeek);
  }

  public isEmpty() {
    if(_.isEmpty(this.studyHours)) {
      return true;
    }
    return this.studyHours.length == 0;
  }
}