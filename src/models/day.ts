import { Week } from './week';
import { StudyHour } from './study_hour';
import * as _ from 'lodash';

export class Day {
  dayOfWeek: number;
  studyHours: Array<StudyHour>

  public getDayName(): String {
    return Week.getNameOfDay(this.dayOfWeek);
  }
}