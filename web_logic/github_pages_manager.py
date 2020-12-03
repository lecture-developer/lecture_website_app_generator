import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class GithubPagesManager:
    """
    A user-like operation in the browser to run operations on github pages
    """

    LOGIN_PAGE_URL = "https://github.com/login"
    NEW_REPO_PAGE_URL = "https://github.com/new"
    MAIN_PAGE_URL = "https://github.com/"

    def __init__(self):
        self.browser = webdriver.Chrome()

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

    def add_repository(self,
                       repo_name: str = "academic_website",
                       description: str = "Academic website developed using sphera.academy") -> None:
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


if __name__ == '__main__':
    checker = GithubPagesManager()
    checker.login(user_name="",
                  password="")
    checker.add_repository()
