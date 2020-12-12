# library imports
import os
import time
import zipfile
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# project imports
from utils.io.file_hadler import FileHandler
from utils.io.path_handler import PathHandler


class GithubPagesManager:
    """
    A user-like operation in the browser to run operations on github pages
    """

    DEFAULT_REPO_NAME = "academic_website"

    LOGIN_PAGE_URL = "https://github.com/login"
    NEW_REPO_PAGE_URL = "https://github.com/new"
    MAIN_PAGE_URL = "https://github.com/"

    master_zip_path = "https://github.com/teddy4445/lecture_website_template/archive/master.zip"

    users_websites_folder = PathHandler.get_relative_path_from_project_inner_folders(["users_websites"])

    def __init__(self):
        self.browser = webdriver.Chrome()
        self.is_login = False

    def login(self,
              user_name: str,
              password: str) -> None:
        self.browser.get(GithubPagesManager.LOGIN_PAGE_URL)
        user_name_field = self.browser.find_element_by_id("login_field")
        user_name_field.send_keys(user_name)
        password_field = self.browser.find_element_by_id("password")
        password_field.send_keys(password)
        self.browser.find_element_by_name("commit").click()

        # just for check
        self.browser.get(GithubPagesManager.MAIN_PAGE_URL)
        assert "Repositories" in self.browser.find_element_by_id("repos-container").text
        self.is_login = True

    def add_repository(self,
                       repo_name: str = DEFAULT_REPO_NAME,
                       description: str = "Academic website developed using sphera.academy") -> None:
        if not self.is_login:
            raise Exception("Cannot do github action before login")
        self.browser.get(GithubPagesManager.NEW_REPO_PAGE_URL)
        user_name_field = self.browser.find_elements_by_name("repository[name]")[0]
        user_name_field.send_keys(repo_name)
        password_field = self.browser.find_element_by_id("repository_description")
        password_field.send_keys(description)
        buttons = self.browser.find_elements_by_tag_name("button")
        for btn in buttons:
            if "Create repository" in btn.text:
                time.sleep(1)
                btn.click()
                time.sleep(3)

    def start_github_pages(self,
                           user_name: str,
                           repo_name: str = DEFAULT_REPO_NAME) -> None:
        if not self.is_login:
            raise Exception("Cannot do github action before login")
        self.browser.get("{}/{}/{}/settings".format(GithubPagesManager.MAIN_PAGE_URL, user_name, repo_name))
        self.browser.find_element_by_class_name("btn select-menu-button d-block d-md-inline-block mb-md-0 mb-2").click()
        time.sleep(1)
        all_labels = self.browser.find_elements_by_xpath("//label[@class='SelectMenu-item text-normal']")
        all_labels[0].click()
        time.sleep(1)
        self.browser.find_element_by_class_name("btn ml-2 js-update-page-source-btn").click()
        self.browser.find_element_by_class_name("SelectMenu-item text-normal").click()

    def download_template(self,
                          download_dir: str) -> None:
        # close any previous open windows of selenium
        self.browser.quit()

        if not self.is_login:
            raise Exception("Cannot do github action before login")
        # To prevent download dialog
        profile = webdriver.ChromeOptions()
        profile.set_capability('browser.download.manager.showWhenStarting', False)
        profile.set_capability('browser.helperApps.neverAsk.saveToDisk', 'text/csv/zip')

        prefs = {'download.default_directory': download_dir}
        profile.add_experimental_option('prefs', prefs)

        new_browser = webdriver.Chrome(chrome_options=profile)
        # download the files
        new_browser.get(url=GithubPagesManager.master_zip_path)

        # don't close the browser until the download is finished
        empty_dir_flag = True
        is_zip_file_flag = False

        # keep the process alive until the file is downloaded currectly
        while empty_dir_flag and not is_zip_file_flag:
            # check if the directory is empty
            if len(os.listdir(download_dir)) != 0:
                empty_dir_flag = False

                # now, we need to make sure it is a zip file (the download finished)
                for file in os.listdir(download_dir):
                    if zipfile.is_zipfile(file):
                        is_zip_file_flag = True
                        # unzip the file in the same folder
                        with zipfile.ZipFile(file, 'r') as zip_ref:
                            zip_ref.extractall(download_dir)
                        # delete original zip - we do not need it anymore
                        FileHandler.delete_file(path=file)
            # wait a second each time so we won't abuse the process
            time.sleep(1)
        # close so we do not have open processes we do not use
        new_browser.quit()


if __name__ == '__main__':
    checker = GithubPagesManager()
    checker.login(user_name="",
                  password="")
    checker.add_repository()
    checker.start_github_pages(user_name="teddy4445")
