# library imports
import os
from datetime import datetime

# project imports
from utils.io.path_handler import PathHandler


class OsGitManager:
    """
    Allows to run GIT commands from the CLI of the OS
    """

    users_websites_folder = PathHandler.get_relative_path_from_project_inner_folders(["users_websites"])

    def __init__(self):
        pass

    @staticmethod
    def _run_command(user_id: str,
                     command: str):
        os.system('cmd /c "cd {} & {}"'.format(os.path.join(OsGitManager.users_websites_folder, user_id),
                                               command))

    @staticmethod
    def clone_new_repo(user_id: str,
                       github_repo_name: str):
        """
        git clone a repo
        :param user_id: the user id we build the folder to
        :param github_repo_name: the repo name we wish to clone
        :return: clone the data
        """
        # create folder
        try:
            os.makedirs(os.path.join(OsGitManager.users_websites_folder, user_id))
        except Exception as error:
            print("Folder for user {} is not created because: {}".format(user_id, error))
        # run the command
        OsGitManager._run_command(user_id=user_id,
                                  command='git clone {}"'.format(github_repo_name))

    @staticmethod
    def upload_repo(user_id: str):
        """
        Upload the user's repo
        """
        OsGitManager._run_command(user_id=user_id,
                                  command='git add ."'.format(github_repo_name))
        os.system('cmd /c "cd {} & "'.format())
        os.system('cmd /c "cd {} & git commit -m "auto update by sphera.academy at {}"'.format(datetime.now()))
        os.system('cmd /c "cd {} & git push"'.format(datetime.now()))

    @staticmethod
    def update_repo(user_id: str):
        """
        get all the repos changes, ignoring the changes we currently have
        """
        os.system('cmd /c "cd {} & git stash -u"')
        os.system('cmd /c "cd {} & git pull"')
