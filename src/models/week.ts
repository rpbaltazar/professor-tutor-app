import * as _ from 'lodash';

import { Day } from './day';
import { StudyHour } from './study_hour';

export class Week {
  studyDays: Array<Day>;

  constructor() {
    // Initialize the whole week in the constructor
    this.studyDays = _.map(Week.getWeekdays(), (dayOfWeek, nameOfDay) => {
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
      6: 'Domingo'
    }
  }
  
  public static getNameOfDay(index): string {
    return Week.getWeekdays()[index];
  }

  public static fromJSON(studyHoursJSON): Week {
    let week = new Week()

    _.map(studyHoursJSON, (studyHours, dayOfWeek) => {
      dayOfWeek = parseInt(dayOfWeek);

      let hours = _.map(studyHours, (studyHourJSON) => {
        return StudyHour.fromJSON(studyHourJSON)
      });

      // Set the study hours for the day of ther week
      week.studyDays[dayOfWeek].studyHours = hours;
    });

    return week;
  }
}