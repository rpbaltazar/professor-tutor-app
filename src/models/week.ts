import * as _ from 'lodash';

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
      0: 'Domingo',
      1: 'Segunda',
      2: 'Terca',
      3: 'Quarta',
      4: 'Quinta',
      5: 'Sexta',
      6: 'Sabado',
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