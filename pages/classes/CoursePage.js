import iPage from "./iPage";

class CoursePage extends iPage {
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
