import IPage from "./IPage";

class ErorPage extends IPage {
  constructor(msg) {
    super();
    this.msg = msg;
  }
}

export default ErorPage;