""" Generic folder handler to manage the functions we do over IO in file system """
# library imports
import os
from glob import glob

# projects
from utils.io.file_hadler import FileHandler


class FolderHandler:
    """ Generic folder handler to manage the functions we do over IO in file system """

    file_count_error_value = -1

    def __init__(self):
        pass

    @staticmethod
    def count_files_in_folder(folder_path: str) -> int:
        if os.path.isdir(folder_path):
            return sum([1 for path in glob(os.path.join(folder_path, "*"))])
        else:
            raise Exception("Not a valid path for a folder")

    @staticmethod
    def delete_all_files_in_folder(folder_path: str) -> None:
        """ delete all files inside a given folder """
        if os.path.isdir(folder_path):
            [FileHandler.delete_file(path=path) for path in glob(os.path.join(folder_path, "*"))]
        else:
            raise Exception("Not a valid path for a folder")

    @staticmethod
    def create_folder(folder_path: str) -> None:
        """ delete all files inside a given folder """
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
