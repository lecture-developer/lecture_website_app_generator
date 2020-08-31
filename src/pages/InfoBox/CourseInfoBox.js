import iInfoBox from "./iInfoBox";

class CourseInfoBox extends iInfoBox {
  constructor(
    infoBoxData = { title, description, buttonObjectData },
    department,
    courseNum,
    university,
    year,
    semester
  ) {
    super(...infoBoxData);

    this.department = department;
    this.courseNum = courseNum;
    this.university = university;
    this.year = year;
    this.semester = semester;
  }
}

export default CourseInfoBox;
