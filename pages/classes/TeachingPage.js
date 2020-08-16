import IPage from "./IPage";

class TeachingPage extends IPage {
  constructor(letsWorkTogetherMessage, courses) {
    super();
    this.letsWorkTogetherMessage = letsWorkTogetherMessage;
    this.courses = courses;
  }
}

export default TeachingPage;