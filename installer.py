import os


def install_server():
    """
    Install all the things we need on the server upon deploy
    """
    this_folder_path = os.path.dirname(__file__)

    try:
        os.makedirs(os.path.join(this_folder_path, "users_websites"))
    except Exception as error:
        pass
