import iPage from "./iPage";

class BlogPage extends iPage {
  constructor(letsWorkTogetherMessage, posts) {
    super();
    this.letsWorkTogetherMessage = letsWorkTogetherMessage;
    this.posts = posts;
  }
}

export default BlogPage;
