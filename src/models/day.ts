import { StudyHour } from './study_hour';
import * as _ from 'lodash';

export class Day {
  dayName: String;
  studyHours: Array<StudyHour>

  constructor(dayName: String, studyHours: Array<StudyHour>) {
    this.dayName = dayName;
    this.studyHours = studyHours;
  }

  private static getNameOfDay(index): String {
    return [
      'Segunda',
      'Terca',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sabado',
      'Domingo'
    ][index]
  }

  public static fromJSON(studyHoursJSON): Array<Day> {
    return _.map(studyHoursJSON, (studyHours, dayOfWeek) => {
      let dayName = Day.getNameOfDay(Number(dayOfWeek));

      let hours = _.map(studyHours, (studyHourJSON) => {
        return StudyHour.fromJSON(studyHourJSON)
      });

      return new Day(dayName, hours)
    });
  }
}