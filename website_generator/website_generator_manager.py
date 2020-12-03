# library imports
import os
import json
from glob import glob
from bs4 import BeautifulSoup


# project imports
from website_generator.components.search_entry import SearchEntry


class WebsiteGeneratorManager:
    """
    Singleton for the whole generating of website code from the template
    """

    # files paths #
    ROOT_FOLDER = r"C:\Users\lazeb\Desktop\lecture_website_template"
    JSONS_DATA_FOLDERS = os.path.join(ROOT_FOLDER, "data", "jsons")
    # end - files paths #

    def __init__(self,
                 indexPage,
                 teachingPage,
                 academicStudentsPage,
                 academicPublicationsPage,
                 blogPage,
                 openResourcesPage,
                 errorPage,
                 coursesPage,
                 SEOglobal):
        self.indexPage = indexPage
        self.teachingPage = teachingPage
        self.academicStudentsPage = academicStudentsPage
        self.academicPublicationsPage = academicPublicationsPage
        self.blogPage = blogPage
        self.openResourcesPage = openResourcesPage
        self.errorPage = errorPage
        self.coursesPage = coursesPage
        self.SEOglobal = SEOglobal

    def generate_website(self):
        pass

    def deploy_website(self):
        pass

    def download_website_as_zip(self):
        pass

    def load_website_from_github(self):
        pass

    def load_website_from_file(self):
        pass

    @staticmethod
    def fix_all_pathes(repo_name: str = ""):
        # run over all files and replace the fixing into the normal form path
        for file in glob(WebsiteGeneratorManager.ROOT_FOLDER + '/**/*', recursive=True):
            if os.path.isfile(file) and file.split(".")[-1] in ["json", "html", "css", "js", "txt"]:
                code = ""
                print("Start fixing file: '{}'".format(file))
                with open(file, "r", encoding="utf-8") as code_file:
                    code = code_file.read()
                with open(file, "w", encoding="utf-8") as code_file:
                    code_file.write(code.replace("/lecture_website_template", repo_name).replace("lecture_website_template", repo_name))
                print("Finish fixing file: '{}'".format(file))


    @staticmethod
    def generate_search_js():
        """
        Read the generated jsons folder an create the search JS file
        """
        # init the results file:
        search_enteries = []
        id = 1
        # read all files and handle each one according to its stricture and logic
        for file_path in glob("{}/*.json".format(WebsiteGeneratorManager.JSONS_DATA_FOLDERS)):
            with open(file_path, "r", encoding="utf-8") as json_data:
                # read the data as json
                json_data = json.load(json_data)
                # find the right json we are looking on
                if "academic-publications" in file_path:
                    for publication in json_data["publications"]:
                        search_enteries.append(SearchEntry(id=id,
                                                           title=publication["name"],
                                                           body=publication["description"],
                                                           short_body=publication["authors"] + " " + publication["publisher"],
                                                           url="/publications.html"))
                        id += 1

                elif "academic-students" in file_path:
                    search_enteries.append(SearchEntry(id=id,
                                                       title="research",
                                                       body="{} {}".format(json_data["opening_text"],
                                                                           ". ".join([element["description"]
                                                                                      for element in json_data["open_positions"]])),
                                                       short_body=". ".join([element["project_name"]
                                                                             for element in json_data["open_positions"]]),
                                                       url="/publications.html"))
                    id += 1
                    for student in json_data["students"]:
                        search_enteries.append(SearchEntry(id=id,
                                                           title=student["name"],
                                                           body=student["description"],
                                                           short_body=student["description"],
                                                           url=student["linkedin_link"]))
                        id += 1
                elif "index" in file_path:
                    search_enteries.append(SearchEntry(id=id,
                                                       title="home page",
                                                       body="{}\n{}".format(json_data["biography"], ". ".join([element for element in json_data["researchInterests"]])),
                                                       short_body=json_data["biography"],
                                                       url="/"))
                    id += 1
                elif "lecturer" in file_path:
                    search_enteries.append(SearchEntry(id=id,
                                                       title=json_data["name"] + " " + json_data["position"],
                                                       body=json_data["field"],
                                                       short_body=". ".join([element["university"]
                                                                             for element in json_data["addresses"]]),
                                                       url="/research.html"))
                    id += 1
                elif "research" in file_path:
                    search_enteries.append(SearchEntry(id=id,
                                                       title="research",
                                                       body="{}. {}".format(json_data["position"], json_data["field"]),
                                                       short_body="{}. {}".format(json_data["position"], json_data["field"]),
                                                       url="/research.html"))
                    id += 1
                    for project in json_data["projects"]:
                        search_enteries.append(SearchEntry(id=id,
                                                           title=project["name"],
                                                           body=project["description"],
                                                           short_body=project["description"][:300] if len(project["description"]) > 300 else project["description"],
                                                           url="/research.html"))
                        id += 1
                elif "teaching" in file_path:
                    search_enteries.append(SearchEntry(id=id,
                                                       title="courses",
                                                       body=json_data["teaching_philosophy"],
                                                       short_body=json_data["teaching_philosophy"][:300] if len(json_data["teaching_philosophy"]) > 300 else json_data["teaching_philosophy"],
                                                       url="/teaching.html"))
                    id += 1
                    for courese in json_data["coureses"]:
                        search_enteries.append(SearchEntry(id=id,
                                                           title=courese["name"] + " " + courese["code"],
                                                           body=courese["description"],
                                                           short_body=" ".join([explantation["explanation"]
                                                                                for explantation in courese["modules"]]),
                                                           url="/course-page.html?course_id={}".format(courese["code"])))
                        id += 1
        return search_enteries


    @staticmethod
    def set_lecturer_name_in_header(header_html, lecturer_name):
        soup = BeautifulSoup(header_html, 'html.parser')
        appearances = soup.find_all(id="lecturer-name-template")
        for appearance in appearances:
            appearance.string.replace_with(lecturer_name)
        return soup

    @staticmethod
    def delete_research_by_id(root, id):
        json_path = root + "/data/jsons/research.json"
        obj = json.load(open(json_path))
        projects = obj["projects"]
        found = False
        for i in range(len(projects)):
            if projects[i]["id"] == id:
                projects.pop(i)
                found = True
                break
        if found:
            open(json_path, "w").write(json.dumps(obj, indent=4, separators=(',', ': ')))
        else:
            raise IOError("a research with an id of {} is not exist".format(id))

if __name__ == '__main__':
    WebsiteGeneratorManager.fix_all_pathes()

