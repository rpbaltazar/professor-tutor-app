import { DateTime } from 'ionic-angular/umd';

export class StudyHour {
  id: Number;
  user_id: Number;
  startTime: DateTime;
  endTime: DateTime;
  startedAt: DateTime;
  completedAt: DateTime;
  description: String;

  public static fromJSON(json): StudyHour {
    let studyHour: StudyHour = new StudyHour()
    studyHour.id = Number(json["id"]);
    studyHour.user_id = Number(json["user_id"]);
    studyHour.startTime = json["start_time"];
    studyHour.endTime = json["end_time"];
    studyHour.startedAt = json["started_at"];
    studyHour.completedAt = json["completed_at"];
    studyHour.description = json["description"];
    return studyHour;
  }
}