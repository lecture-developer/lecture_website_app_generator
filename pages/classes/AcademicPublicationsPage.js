import IPage from "./IPage";

class AcademicPublicationsPage extends IPage {
  constructor(teachingPhilosophy, academicPublications) {
    super();
    this.teachingPhilosophy = teachingPhilosophy;
    this.academicPublications = academicPublications;
  }
}

export default AcademicPublicationsPage;