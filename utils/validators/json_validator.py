import json
from jsonschema import validate, SchemaError, ValidationError
from utils.io.file_hadler import FileHandler

# dict of all schemas files
json_schema_files_dict = {
    "add_new_course": "course_schema.json"
}


class JsonValidator:
    """ an interface to handle all jsons we wish to do check  """

    def __init__(self):
        pass

    @staticmethod
    def validates(schema_key: str, json_data: dict):
        """
        Validates if the json data contains all data needed.
        :param schema_key: key in json schemae path dic
        :param json_data:
        """
        # get the path to the schema
        path_schema = json_schema_files_dict[schema_key]
        # read the json file and create a dict
        schema_data = FileHandler.read_all(path_schema)
        schema = json.loads(schema_data)
        try:
            validate(json_data, schema)
        except SchemaError as e:
            print("There is an error with the schema")
        except ValidationError as e:
            print(e)
            raise
