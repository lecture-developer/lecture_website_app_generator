import IPage from "./IPage";

class OpenResourcesPage extends IPage {
  constructor(letsWorkTogetherMessage, resources) {
    super();
    this.letsWorkTogetherMessage = letsWorkTogetherMessage;
    this.resources = resources;
  }
}

export default OpenResourcesPage;