import { publicationStatus } from '../../resources/constants';

class AcademicPublication {
  constructor(title, abstractText, publisher, year, authors, pubStatus, relatedFiles) {
    this.title = title;
    this.abstractText = abstractText;
    this.publisher = publisher;
    this.year = year;
    this.authors = authors;
    this.pubStatus = pubStatus;
    this.relatedFiles = relatedFiles;
  }
}

export default AcademicPublication;
