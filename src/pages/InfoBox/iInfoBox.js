class iInfoBox {
  constructor(title, description, buttonObjectData = { text, type, link }) {
    this.title = title;
    this.description = description;
    this.buttonObjectData = buttonObjectData;
  }
}

export default iInfoBox;
