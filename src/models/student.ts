import { SafeHtml } from '@angular/platform-browser';
export class Student {
  id: Number;
  firstName: String;
  lastName: String;
  emailAddress: String;

  constructor() {
    
  }

  public fullName(): String {
    return `${this.firstName} ${this.lastName}`
  }

  public static fromJSON(studentJSON) {
    let student:Student = new Student()
    student.id = studentJSON.id;
    student.firstName = studentJSON.first_name;
    student.lastName = studentJSON.last_name;
    student.emailAddress = studentJSON.email;
    return student;
  }
}