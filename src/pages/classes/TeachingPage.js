import iPage from "./iPage";

class TeachingPage extends iPage {
  constructor(letsWorkTogetherMessage, courses) {
    super();
    this.letsWorkTogetherMessage = letsWorkTogetherMessage;
    this.courses = courses;
  }
}

export default TeachingPage;
