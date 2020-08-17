class iPage {
  constructor(SEOpage) {
    this.SEOpage = SEOpage;
  }

  generatePage = () => {
    console.log('Generating page...');
  }

  loadPage = () => {
    console.log('Loading page...');
  }

  analyzeSEO = () => {
    this.SEOpage.analyzeSEO();
  }
}

export default iPage;