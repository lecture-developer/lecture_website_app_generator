import IPage from "./IPage";

class IndexPage extends IPage {
  constructor(aboutText, featuredPublications, currentProjects) {
    super();
    this.aboutText = aboutText;
    this.featuredPublications = featuredPublications;
    this.currentProjects = currentProjects;
  }

}

export default IndexPage;