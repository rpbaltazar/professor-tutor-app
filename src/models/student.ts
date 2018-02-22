export class Student {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;

  constructor() {
    
  }

  public fullName(): string {
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