import iInfoBox from './iInfoBox';
import { studentTypes } from '../../resources/constants';

class StudentInfoBox extends iInfoBox {
  constructor(infoBoxData = { title, description, buttonObjectData }, type, linkedinLink) {
    super(...infoBoxData);
    this.type = type;
    this.linkedinLink = linkedinLink;
  }
}

export default StudentInfoBox;