import json

from utils.io.path_handler import PathHandler

# ---> Settings Interpreter File <--- #

# CONSTS #
SETTINGS_FILE_PATH = PathHandler.get_relative_path_from_project("utils/settings/settings.json")
# End - CONSTS #


class Settings:
    """ Handle the settings reading process for all the project """

    def __init__(self, file_location=SETTINGS_FILE_PATH):
        self.file_location = file_location
        self.setting_group = None
        self.setting_group_iter = None
        pass

    @staticmethod
    def interpreter(theme, key, location=SETTINGS_FILE_PATH):
        """default file to read settings from json file using only 2 layers """
        try:
            if theme is not None and key is not None:
                # try to read from settings file
                with open(location) as settings_file:
                    data = json.load(settings_file)
                if data is not None:
                    return data[theme][key]
                else:
                    return FileExistsError(
                        "We can not find the settings file, make sure you have "
                        + location
                        + " in the root dir"
                    )
            else:
                raise Exception("You need to provide theme and key to the settings interpreter")
        except Exception as error:
            raise Exception("You need to provide theme and key to the settings interpreter")

    def multi_interpreter(self, keys):
        """ get a setting from a generic json file given only the key path to the property
        :rtype: str
        """
        # first - check the arguments are legit #
        # run over all the keys
        for index, key in enumerate(keys):
            # normalize the keys
            key = str(key).strip()
            # check if valid key
            if key is None or key == "":
                raise Exception("You need to provide theme and key to the settings interpreter")
        # try open and read from file
        try:
            # read database
            with open(self.file_location) as settings_file:
                data = json.load(settings_file)
            # check if we found any database
            if data is None:
                raise Exception("You need to provide theme and key to the settings interpreter")
            # get into the right location
            for key in keys:
                data = data[key]
            # if this is not a final value, allow iteration on it
            if isinstance(data, dict):
                self.setting_group = data
                self.setting_group_iter = iter(data)
            # this is the value inside "database" at this point
            return data
        except Exception as error:
            raise Exception("You need to provide theme and key to the settings interpreter")

    def iter(self):
        """ when interpreter returns a 'dict' and not a single value,
                this function allows to iterate over the results """
        if self.setting_group is None:
            raise Exception("No Dictionary to read values from")
        try:
            return self.setting_group[next(self.setting_group_iter)]
        except StopIteration:
            # make sure we understand the run is over
            self.setting_group = None
            self.setting_group_iter = None