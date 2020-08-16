import IPage from "./IPage";

class CoursePage extends IPage {
  constructor(name, aboutText, sources, lessons, homeWorkQuestions, homeWorkAnswers) {
    super();
    this.name = name;
    this.aboutText = aboutText;
    this.sources = sources;
    this.lessons = lessons;
    this.homeWorkQuestions = homeWorkQuestions;
    this.homeWorkAnswers = homeWorkAnswers;
  }
}

export default CoursePage;