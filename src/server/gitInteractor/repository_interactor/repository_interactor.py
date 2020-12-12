from github import Github
import sys


class RepositoryInteractor():
    def __init__(self):
        pass


class GitHubInteractor(RepositoryInteractor):
    def __init__(self, token):
        super().__init__()
        self.token = token
        self.g = Github(token)
        self.user = self.g.get_user()

    def create_text_file(self, repo_name, file_path):
        # get the repository
        try:
            repo = self.user.get_repo(repo_name)

            # get the file name
            file_name = file_path.split('/')[-1]

            # read the file and upload to git
            with open(file_path, 'r') as f:
                repo.create_file(file_name, f'uploading {file_name} from {repo_name} repository', *f.readlines())
            f.close()
            return True
        except Exception as e:
            print("No such repository!", e, file=sys.stderr)
            return False

    def update_text_file(self, repo_name, file_name, new_file_path):
        # get the repository
        try:
            repo = self.user.get_repo(repo_name)

            file = repo.get_contents(file_name)

            # read the file and upload to git
            with open(new_file_path, 'r+') as f:
                repo.update_file(file_name, f'updating {file_name} from {repo_name} repository', *f.readlines(), file.sha)
            f.close()
            return True
        except Exception as e:
            print("No such repository!", e, file=sys.stderr)
            return False

    def delete_file(self, repo_name, file_name):
        # get the repository
        try:
            repo = self.user.get_repo(repo_name)

            file = repo.get_contents(file_name)

            repo.delete_file(file_name, f'deleting {file_name} from {repo_name} repository', file.sha)
            return True
        except Exception as e:
            print("No such repository!", e, file=sys.stderr)
            return False

    def create_repo(self, repo_name, private=False, auto_init=False):
        try:
            self.user.create_repo(repo_name, private=private, auto_init=auto_init)
            return True
        except Exception as e:
            print("Could not create repository!", e, file=sys.stderr)
            return False

    def delete_repo(self, repo_name):
        try:
            repo = self.user.get_repo(repo_name)
            repo.delete()
            return True
        except Exception as e:
            print("Could not delete repository!", e, file=sys.stderr)
            return False

    def get_file_content(self, repo_name, file_name):
        try:
            repo = self.user.get_repo(repo_name)
            content = repo.get_contents(file_name)
            return content
        except Exception as e:
            print(e)
            return None
