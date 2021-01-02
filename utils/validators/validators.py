import datetime
import json
from jsonschema import validate, SchemaError, ValidationError
from utils.io.file_hadler import FileHandler
from utils.io.path_handler import PathHandler

"""
All schemas created with online tool:
https://easy-json-schema.github.io/
"""
# dict of all schemas files
JSON_SCHEMA_FILES_DICT = {
    "set_teaching": "utils/validators/teaching_schema.json",
    "set_global_seo": "utils/validators/global_seo_schema.json",
    "set_academic_publications": "utils/validators/academic_publications_schema.json",
    "set_research_file": "utils/validators/research_schema.json",
    "set_lecturer": "utils/validators/lecturer_schema.json",
    "set_index": "utils/validators/index_schema.json",
    "set_resources": "utils/validators/resources_schema.json",
}

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

DATE_FORMAT = "%d.%m.%Y"


class Validators:
    """ an interface to handle file and data we wish to do check  """

    def __init__(self):
        pass

    @staticmethod
    def json_validates(schema_key: str, json_data: dict):
        """
        Validates if the json data contains all data needed.
        :param schema_key: key in json schemae path dic
        :param json_data:
        """
        # get the path to the schema
        path_schema = JSON_SCHEMA_FILES_DICT[schema_key]
        full_path_schema = PathHandler.get_relative_path_from_project(path_schema)

        # read the json file and create a dict
        schema_data = FileHandler.read_all(full_path_schema)
        schema = json.loads(schema_data)
        try:
            validate(json_data, schema)
        except SchemaError as e:
            print("There is an error with the schema")
        except ValidationError as e:
            print(e)
            raise

    @staticmethod
    def allowed_file(filename: str):
        """
        Check if file type allowed/
        :param filename:
        :return:
        """
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    @staticmethod
    def validate_notifications(data: str):
        """
        Input: string of all notifications, separated by \n.
        Check if each notification contain needed data.
        :param data:
        :return: True, data if input correct. False, Error string otherwise.
        """
        # split all received notifications to a list
        notification_list = data.split('\n')
        # Check each notification
        for index, notification in enumerate(notification_list):
            # notification contains date and data line, all separated by space.
            # Date comes first.
            notification_data = notification.split(" ")
            # if one notification contains only date or data, return error.
            if len(notification_data) == 1:
                return False, f"The {index} index notification missing data. " \
                              f"Received only {notification_data}"
            # if date not in needed format, return error.
            date = notification_data[0]
            try:
                datetime.datetime.strptime(date, DATE_FORMAT)
            except ValueError:
                return False, f"The {index} index has incorrect date string format. " \
                              f"Received {date} It should be in format: {DATE_FORMAT}."
        return True, "OK"

