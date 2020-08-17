class LecturerDetails {
  constructor(name, email, phone, position, researchField, officeAddress, links = { image, linkedIn, googleScholar}) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.position = position;
    this.researchField = researchField;
    this.officeAddress = officeAddress;
    this.links = links;
  }
}

export default LecturerDetails;
