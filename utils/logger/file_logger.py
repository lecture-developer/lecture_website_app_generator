"""
Print logs to screen and saves them in some file
"""
# library imports
import os
from datetime import datetime


class Logger:

    def __init__(self, file_path: str, mark_init=False):
        if not os.path.exists(file_path):
            file = open(file_path, "w+")
            file.write("Start log at {}".format(datetime.now().strftime("%m/%d/%Y, %H:%M:%S")))
            file.close()
        self._log_path = file_path
        # if it's important to mark inside the log or screen when we write to
        if mark_init:
            print("Init logger with path {} \n".format(self._log_path))

    def log(self, message: str):
        with open(self._log_path, "a") as file:
            file.write(message + "\n")
            print(message, end="\n")

    def log_with_time(self, message: str):
        with open(self._log_path, "a") as file:
            text = message + " (" + str(datetime.now().replace(microsecond=0)) + ")"
            file.write(text + "\n")
            print(text, end="\n")

    def log_list(self, messages: list):
        with open(self._log_path, "a") as file:
            for message in messages:
                file.write(message + "\n")
                print(message, end="\n")

    def error(self, class_name: str, function_name: str, error: str):
        error_string = "Error at {} from {} saying: {}".format(class_name, function_name, error)
        self.log(error_string)

    def error_stack(self, classes_names: list, functions_names: list, error: str):
        """ print a trace of classes and function we have error in """
        # make sure everything is working
        if classes_names is None or \
                functions_names is None or \
                len(classes_names) == 0 or \
                len(classes_names) != len(functions_names):
            print("We have error to log the error trace log")
        full_error = ""
        for index in range(len(classes_names)):
            full_error += "Error at {} from {} saying: "
        full_error += "Error Message: {}".format(error)
        self.log(full_error)

    def clear(self):
        """ clear log """
        open(self._log_path, "w+").close()


class ClassLogger(Logger):
    """ extends the File Logger to start prints with location of class and method it prints from """

    def __init__(self, file_path: str, class_name: str, mark_init=False):
        Logger.__init__(self, file_path)
        if class_name is None or len(class_name) == 0:
            self._class_name = "Unknown"
        else:
            self._class_name = class_name
        self.method_name = ""
        if mark_init:
            print("To class {}".format(self._log_path, self._class_name))

    def logit(self, message: str, method_name=""):
        """ as log but with method and class """
        if self.method_name is not None and self.method_name != "" and method_name == "":
            full_message = "Class {}, method {}, saying: {}".format(self._class_name, self.method_name, message)
        elif method_name != "":
            full_message = "Class {}, method {}, saying: {}".format(self._class_name, method_name, message)
        else:
            full_message = "Class {}, saying: {}".format(self._class_name, message)

        Logger.log(self, full_message)
        return full_message


class TimeLogger(Logger):
    """ A rapper class to the logger to print time function """

    def __init__(self, file_path: str):
        Logger.__init__(self, file_path)
        self._start_time = None
        self.click_start_time()

    def click_start_time(self):
        """ remember the start time """
        self._start_time = datetime.now().replace(microsecond=0)

    def log_time(self, process_name: str, start_time=None) -> None:
        """
        tell how much time took each pv_process
        """
        # make sure pv_process has name - else, put unknown
        if process_name is None or len(process_name) == 0:
            process_name = "unknown"
        # get delta in tile
        delta_time = datetime.now().replace(microsecond=0) - start_time \
            if start_time is not None \
            else datetime.now().replace(microsecond=0) - self._start_time
        # tell it
        self.log_with_time("Process {} took: {} | ".format(process_name, delta_time))

    def log_time_with_click(self, process_name: str, start_time=None) -> None:
        """ log time and reset the click for next time """
        self.log_time(process_name=process_name, start_time=start_time)
        self.click_start_time()

    def log_start_clock(self, message: str) -> None:
        """ log time and reset the click for next time """
        self.log(message=message)
        self.click_start_time()
