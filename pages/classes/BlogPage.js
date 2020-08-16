import IPage from "./IPage";

class BlogPage extends IPage {
  constructor(letsWorkTogetherMessage, posts) {
    super();
    this.letsWorkTogetherMessage = letsWorkTogetherMessage;
    this.posts = posts;
  }
}

export default BlogPage;