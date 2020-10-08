import iPage from "./iPage";

class IndexPage extends iPage {
  constructor(aboutText, featuredPublications, currentProjects) {
    super();
    this.aboutText = aboutText;
    this.featuredPublications = featuredPublications;
    this.currentProjects = currentProjects;
  }
}

export default IndexPage;
