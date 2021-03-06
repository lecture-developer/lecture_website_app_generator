"""
A file to manage write and read to files
"""
# library imports
import os
import sys
import json
from werkzeug.utils import secure_filename



class FileHandler:
    """ an interface to handle all things we wish to do with basic files """

    def __init__(self):
        pass

    @staticmethod
    def write(path: str, text: str):
        """ write text to path """
        with open(path, "w+", encoding="utf-8") as file:
            file.write(text)

    @staticmethod
    def write_csv(path: str, title: str, rows: list):
        """ write text to path """
        with open(path, "w+", encoding="utf-8") as csv_file:
            csv_file.write(title)
            for row in rows:
                if row.endswith("\n"):
                    csv_file.write(row)
                else:
                    csv_file.write("{}\n".format(row))

    @staticmethod
    def append_to_json_by_key(data_obj_to_append: dict, key: str, path: str):
        """
        Append new data to a specific key in a json file.
        """
        with open(path) as json_file:
            data = json.load(json_file)  # set data as python object
            if key not in data:
                print(f'Error: can not find {key} in the Json file:{path}')
                return
            temp = data[key]
            # appending data
            temp.append(data_obj_to_append)
        json_file.close()
        # write the updated json data to file. -Rewrite the whole file
        with open(path, 'w') as json_file:
            json.dump(data, json_file, indent=4)
        json_file.close()

    @staticmethod
    def append_to_json(data_obj_to_append: dict, path: str):
        """
        Append new data to a specific key in a json file.
        """
        with open(path) as json_file:
            data = json.load(json_file)  # set data as python object
            for key in data_obj_to_append:
                # if the key inside dict and contains list value
                val = data_obj_to_append[key]
                if key in data and isinstance(val, list):
                    data[key].extend(val)
                else:
                    data[key] = val
        json_file.close()
        # write the updated json data to file. -Rewrite the whole file
        with open(path, 'w') as json_file:
            json.dump(data, json_file, indent=4)
        json_file.close()

    @staticmethod
    def write_to_json(json_data: dict, path: str):
        """
        Write data to a specific json file.
        """
        # write the updated json data to file. -Rewrite the whole file
        with open(path, 'w') as json_file:
            json.dump(json_data, json_file, indent=4)
        json_file.close()

    @staticmethod
    def write_lines(path: str, text_lines: list):
        """ write text to path """
        with open(path, "w+", encoding="utf-8") as file:
            for line in text_lines:
                file.write(line + "\n")

    @staticmethod
    def append(path: str, text: str):
        """ write text to path """
        with open(path, "a", encoding="utf-8") as file:
            file.write(text)

    @staticmethod
    def read_all(path: str) -> str:
        """ read all text as a line """
        answer = ""
        with open(path, "r", encoding="utf-8") as file:
            answer = file.read()
        return answer

    @staticmethod
    def read_lines(path: str) -> list:
        """ read all text as a line """
        answer = ""
        with open(path, "r", encoding="utf-8") as file:
            answer = file.readlines()
        return answer


    @staticmethod
    def save_new_file(path:str, file):
        """
        Save file in given path.
        note: If file name in form ".../.../name.type", keep only "name.type"
        :param path: To save the file
        :param file:
        :return:
        """
        filename = secure_filename(file.filename)
        file.save(os.path.join(path, filename))
        return


    @staticmethod
    def delete_file(path: str) -> bool:
        """ if file exsits delete it """
        if os.path.exists(path):
            os.remove(path)
            return True
        return False

    @staticmethod
    def exists(path: str) -> bool:
        """ check if file in path """
        return os.path.exists(path) if isinstance(path, str) and len(path) > 0 else False

    @staticmethod
    def _is_pathname_valid(pathname: str) -> bool:
        '''
        True if the passed pathname is a valid pathname for the current OS;
        False otherwise.
        '''
        # If this pathname is either not a string or is but is empty, this pathname
        # is invalid.
        try:
            if not isinstance(pathname, str) or not pathname:
                return False

            _, pathname = os.path.splitdrive(pathname)

            root_dirname = os.environ.get('HOMEDRIVE', 'C:') \
                if sys.platform == 'win32' else os.path.sep
            assert os.path.isdir(root_dirname)

            root_dirname = root_dirname.rstrip(os.path.sep) + os.path.sep

            for pathname_part in pathname.split(os.path.sep):
                try:
                    os.lstat(root_dirname + pathname_part)
                except:
                    pass
        except OSError as os_err:
            raise os_err
        except TypeError as type_err:
            raise type_err
        else:
            return True
