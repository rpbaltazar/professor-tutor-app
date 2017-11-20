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
      0: 'Segunda',
      1: 'Terca',
      2: 'Quarta',
      3: 'Quinta',
      4: 'Sexta',
      5: 'Sabado',
      6: 'Domingo',
    }
  }
  
  public static getNameOfDay(index): string {
    return Week.getWeekdays()[index];
  }

  public static fromJSON(studyHoursJSON): Week {
    moment.locale("pt")

    let week = new Week()

    _.map(studyHoursJSON, (studyHourJSON) => {
      let studyHour = StudyHour.fromJSON(studyHourJSON)
      let dayOfWeek = studyHour.startTime.weekday()
      week.studyDays[dayOfWeek].studyHours.push(studyHour);
    });

    return week;
  }
}