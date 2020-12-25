import json
from jsonschema import validate, SchemaError, ValidationError
from utils.io.file_hadler import FileHandler
from utils.io.path_handler import PathHandler

# dict of all schemas files
json_schema_files_dict = {
    "set_teaching": "utils/validators/teaching_schema.json",
    "set_global_seo": "utils/validators/global_seo_schema.json",
    "set_academic_publications": "utils/validators/academic_publications_schema.json",
    "set_research_file": "utils/validators/academic_publications_schema.json"
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
