import { publicationStatus } from '../../resources/constants';

class AcademicPublication {
  constructor(title, abstract, publisher, year, authors, status, relatedFiles) {
    this.title = title;
    this.abstract = abstract;
    this.publisher = publisher;
    this.year = year;
    this.authors = authors;
    this.status = status;
    this.relatedFiles = relatedFiles;
  }
}

export default AcademicPublication;
