import IPage from "./IPage";

class AcademicStudentsPage extends IPage {
  constructor(letsWorkTogetherMessage, students) {
    super();
    this.letsWorkTogetherMessage = letsWorkTogetherMessage;
    this.students = students;
  }
}

export default AcademicStudentsPage;