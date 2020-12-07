import zipfile
import sys
import os

from web_logic.github_pages_manager import GithubPagesManager


def create_new_user(user_name) -> None:
    # TODO: insert user to DB
    pass

    manager = GithubPagesManager()
    dir_path = '\\'.join([manager.users_websites_folder, user_name])
    try:
        # create new folder for the user in the users directory
        os.mkdir(dir_path)

        # download template code into the user's directory
        manager.login(user_name='username', password='password')
        manager.download_template(dir_path)

        file_path = ''

        # get the zip file path
        for file in os.listdir(dir_path):
            if file.endswith('.zip'):
                file_path = '\\'.join([dir_path, file])

        if file_path != '':
            # extract files from zip
            with zipfile.ZipFile(file_path, 'r') as zip_ref:
                zip_ref.extractall(dir_path)

            os.remove(file_path)

        # get data from user
        # TODO: get the data from the user
        data = {'f1.txt': 'dude', 'f2.txt': 'dude2'}

        # update local user's directory
        for file_name, content in data.items():
            # create the path to the file inside the user's directory
            file_path = '/'.join([dir_path, file_name])
            with open(file_path, 'w') as f:
                f.write(content)

        # TODO: continue to git...
        pass
    except Exception as e:
        print(e, file=sys.stderr)


def update_user_data(user_name):
    # get the path to folder of the user from the users directory
    dir_path = '/'.join([GithubPagesManager.users_websites_folder, user_name])

    # get data from user
    # TODO: get the data from the user
    data = {'f1.txt': 'dude3', 'f2.txt': 'dude21'}

    # update local user's directory
    for file_name, content in data.items():
        # create the path to the file inside the user's directory
        file_path = '/'.join([dir_path, file_name])
        with open(file_path, 'w') as f:
            f.write(content)
            print(f'file updated: {f.name}')

    # TODO: continue to git...
    pass