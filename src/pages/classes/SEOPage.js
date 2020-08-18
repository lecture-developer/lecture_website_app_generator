class SEOPage {
  constructor(title, description, keywords = []) {
    this.title = title;
    this.description = description;
    this.keywords = keywords;
  }

  analyzeSEO = () => {
    console.log('Analyzing SEO...');
  }
}

export default SEOPage;
