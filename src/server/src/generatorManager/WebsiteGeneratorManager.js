class WebsiteGeneratorManager {
  constructor(
    indexPage,
    teachingPage,
    academicStudentsPage,
    academicPublicationsPage,
    blogPage,
    openResourcesPage,
    errorPage,
    coursesPage,
    SEOglobal
  ) {
    this.indexPage = indexPage;
    this.teachingPage = teachingPage;
    this.academicStudentsPage = academicStudentsPage;
    this.academicPublicationsPage = academicPublicationsPage;
    this.blogPage = blogPage;
    this.openResourcesPage = openResourcesPage;
    this.errorPage = errorPage;
    this.coursesPage = coursesPage;
    this.SEOglobal = SEOglobal;
  }

  generateWebsite = () => {
    // first, copy from the template all the stracture; including html, css, js, fonts, img, components, data files and folders
    // for the global elements of the website - generate:
    // /components/header.html
    // /components/footer.html
    // /data/notifications.txt
    // /data/app-messages.txt
    // /data/jsons/lecturer.json
    // /data/jsons/global-seo.json
    // if given, replace the following files with user-provided ones:
    // /imgs/personal_image.png
    // generate each page in the following order: html file, json file
    // /index.html
    // /openresources.html
    // /privacy-policy.html
    // /teaching.html
    // /academic-students.html
    // /academic-publications.html
    // /404.html
    // /blog.html
    // /course-page.html
  };

  deployWebsite = () => {};

  downloadWebsiteAsZip = () => {};

  loadWebsiteFromGithub = (url) => {};

  loadWebsiteFromFile = () => {};
}

export default WebsiteGeneratorManager;
