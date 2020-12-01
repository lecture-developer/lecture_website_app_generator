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
    def __init__(self, seo_page, data):  # data is dictionary
        IPage.__init__(self, seo_page=seo_page)
        self.biography = ""
        self.researchInterests = []
        self.featuredPublications = []
        self.currentProjects = []
        if data is not None:
            json_data = self.generate_page(data)
            self.load_page(json_data)

    """
        Change the JSON to be the right format
        return JSON
    """
    def generate_page(self,data):  # TODO



    """
        Loads new data to object fields
        can be used for init and future edits of data
    """
    def load_page(self, data):  # data as dictionary
        if data is None:
            log.debug("data is None")
            return;
        bio = data["biography"]
        res = data["researchInterests"]
        pub = data["featuredPublications"]
        prj = data["currentProjects"]
        if bio is not None:
            if bio != "" and bio != self.biography:
                self.biography = data["biography"]  # string
        if res is not None:
            if res:  # if res not empty
                self.researchInterests = res
        if pub is not None and pub != []:
            self.featuredPublications = pub
        if prj is not None and prj != []:
            self.currentProjects = prj



