# library imports
import os
from glob import glob


class PathHandler:
    """ A class to manage logic for path creation """

    def __init__(self):
        pass

    @staticmethod
    def get_project_path() -> str:
        """ get the path of the project location on the machine as absolute path """
        return PathHandler.get_parent_path(path=os.path.dirname(__file__), n=2)

    @staticmethod
    def get_relative_path_from_project_inner_folders(path_parts: list) -> str:
        """ from the project base path build inner irarachy by inner folders """
        # get start point
        answer = PathHandler.get_project_path()
        # get the inner path
        for path_part in path_parts:
            answer = os.path.join(answer, path_part)
        return answer

    @staticmethod
    def get_relative_path_from_project(inner_path: str) -> str:
        """ from the project base path build inner irarachy by string to be splited """
        # consts
        windows_spliter = "\\"
        unit_spliter = "/"
        # find right string case
        # TODO: improve the checks logic, inner conditions build
        if windows_spliter in inner_path and unit_spliter in inner_path:
            path_parts = inner_path.replace(windows_spliter, unit_spliter).split(unit_spliter)
        elif windows_spliter in inner_path:
            path_parts = inner_path.split(windows_spliter)
        elif unit_spliter in inner_path:
            path_parts = inner_path.split(unit_spliter)
        else:
            path_parts = [inner_path]
        # run original process from list of folders; file
        return PathHandler.get_relative_path_from_project_inner_folders(path_parts=path_parts)

    @staticmethod
    def get_class_in_project_path(class_file_name: str) -> str:
        """ get the path of the file in the project location on the machine as absolute path """
        # check the args are legit
        if not (isinstance(class_file_name, str) and len(class_file_name) > 0):
            raise Exception("args are not legit")
        # find optinal paths
        answer_paths = glob(os.path.join(PathHandler.get_project_path(), "{}.py".format(class_file_name)), recursive=True)
        # if we find such file then return it, elsewhere tell that there is an error in the requested file
        if len(answer_paths) == 1:
            return answer_paths[0]
        raise Exception("'{}' cannot be found in the project's files directory".format(class_file_name))

    @staticmethod
    def get_parent_path(path: str, n=1) -> str:
        """
        get the folder of the path given
        :param path: the path to get it's parents
        :param n: the number of parents of the given path
        :return: new path as a string
        """
        # check the args are legit
        if not (isinstance(n, int) and n > 0 and isinstance(path, str)):
            raise Exception("args are not legit")
        # calc parent's folder's path - 'n' times
        answer = path
        for i in range(n):
            answer = os.path.abspath(os.path.join(answer, ".."))
        return answer

    @staticmethod
    def get_all_file_pathes_in_folder(folder_path: str) -> list:
        """ return all the pathes of *files* in the given folder path """
        # check the args are legit
        if not (isinstance(folder_path, str)):
            raise Exception("args are not legit")
        # calc parent's folder's path - 'n' times
        return glob(os.path.join(folder_path, "*"))
