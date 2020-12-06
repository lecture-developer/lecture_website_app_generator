from website_generator.pages.ipage import IPage
import logging
import json


log = logging.getLogger("logger")


class IndexPage(IPage):
    """
    Index Page, input : data as JSON object
        biography - string
        researchInterests - array of strings
        featuredPublications - {name,description,filelinks=[{}],authors,year,topic,type,publisher,publicationStatus}
        currentProjects - {name,topic,description,link={}}
    """
    def __init__(self, seo_page):
        IPage.__init__(self, seo_page=seo_page)
        self.biography = ""
        self.research_interests = []
        self.featured_publications = []
        self.current_projects = []

    def set_data(self, biography, researchInterests, featuredPublications, currentProjects):
        if biography != "" and biography is not None:
            self.biography = json.loads(biography)["biography"]  # string
        if researchInterests != "" and researchInterests is not None:
            self.research_interests = json.loads(researchInterests)["researchInterests"]  # array of strings
        if featuredPublications != "" and featuredPublications is not None:
            self.featured_publications = json.loads(featuredPublications)["featuredPublications"]  # array of dictionaries
        if currentProjects != "" and currentProjects is not None:
            self.current_projects = json.loads(currentProjects)["currentProjects"]

    """
        make index.json
    """
    def generate_page(self):
        json_object = {
            "biography": self.biography,
            "researchInterests": self.research_interests,
            "featuredPublications": self.featured_publications,
            "currentProjects": self.current_projects
        }
        return json.dumps(json_object)


    """
        TODO: define and implement
    """
    def load_page(self):
        return

    def set_biography(self, new_biography):
        if new_biography is not None:
            if new_biography != self.biography:
                self.biography = new_biography

    def set_researches(self, new_biography):
        if new_biography is not None:
            if new_biography != self.biography:
                self.biography = new_biography


