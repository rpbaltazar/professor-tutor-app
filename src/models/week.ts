import * as _ from 'lodash';
import moment, { Moment } from 'moment';

import { Day } from './day';
import { StudyHour } from './study_hour';

export class Week {
  studyDays: Array<Day>;

  constructor() {
    // Initialize the whole week in the constructor
    this.studyDays = _.map(Week.getWeekdays(), (nameOfDay, dayOfWeek) => {
      let day: Day = new Day();
      day.dayOfWeek = dayOfWeek;
      return day;
   });
  }

  private static getWeekdays(): any {
    return {
      "1": 'Segunda',
      "2": 'Terça',
      "3": 'Quarta',
      "4": 'Quinta',
      "5": 'Sexta',
      "6": 'Sábado',
      "7": 'Domingo'
    }
  }

  public static getNameOfDay(index): string {
    return Week.getWeekdays()[index];
  }

  public static fromJSON(studyHoursJSON): Week {
    let week = new Week()

    _.map(studyHoursJSON, (studyHourJSON) => {
      let studyHour = StudyHour.fromJSON(studyHourJSON)
      let dayOfWeek = (studyHour.startTime.isoWeekday()+6)%7;
      week.studyDays[dayOfWeek].studyHours.push(studyHour);
    });

    return week;
  }
}
