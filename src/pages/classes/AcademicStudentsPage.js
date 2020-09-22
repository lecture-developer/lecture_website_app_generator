import iPage from "./iPage";

class AcademicStudentsPage extends iPage {
  constructor(letsWorkTogetherMessage, students) {
    super();
    this.letsWorkTogetherMessage = letsWorkTogetherMessage;
    this.students = students;
  }
}

export default AcademicStudentsPage;
