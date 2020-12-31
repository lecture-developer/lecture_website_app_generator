# library imports
import re
import os
import uuid
import enum
import json
import atexit
import hashlib
import zipfile
import requests
from flask_login import UserMixin
from flask_pymongo import PyMongo
from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, request, render_template, jsonify, send_from_directory, redirect, url_for, session, abort, \
    make_response
from flask_login import LoginManager, login_user, logout_user, login_required, current_user

# project imports
from jsonschema import ValidationError

from web_logic.enums import *
from installer import install_server
from web_logic import user_manipulator
from web_logic.email_templates import *
from web_logic.os_git_commands import OsGitManager
from web_logic.github_pages_manager import GithubPagesManager

# project utils
from utils.io.file_hadler import FileHandler
from utils.io.path_handler import PathHandler
from utils.io.folder_handler import FolderHandler
from utils.validators.validators import Validators

# install on the running server anything we need
install_server()

# init server #

app = Flask(__name__)
app.secret_key = "really-secret-key"
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

sched = BackgroundScheduler(daemon=True)

# end - init server #

# global vars #

# end - global vars #

# global consts #
TEMPLATE_GITHUB_REPO_USERNAME = ""
TEMPLATE_GITHUB_REPO_EMAIL = ""
TEMPLATE_GITHUB_REPO_PASSWORD = ""
USER_REPO_DESCRIPTION = "The academic website of {}, created by sphera.academy"
USER_REPO_NAME = "academic_website_{}"


# end - global consts #

# jobs execute each few hours consts #


def send_remind_emails():
    pass


# add function to the event list
sched.add_job(send_remind_emails, 'interval', minutes=1)
# Explicitly kick job_function the background thread
sched.start()
# Shutdown your cron thread if the web process is stopped
atexit.register(lambda: sched.shutdown(wait=False))


# end - jobs execute each few hours consts #

# website pages #


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")


@app.route("/contact-us", methods=["GET", "POST"])
def contact_us():
    return render_template("contact-us.html")


@app.route("/join-our-team", methods=["GET", "POST"])
def join_our_team():
    return render_template("join-our-team.html")


@app.route("/join-us-as", methods=["GET", "POST"])
def join_us_as():
    return render_template("join-us-as.html", page=request.args.get('page'))


@app.route("/legal", methods=["GET", "POST"])
def legal():
    return render_template("legal.html")


@app.route("/sign-for-beta", methods=["GET", "POST"])
def sign_for_beta():
    return render_template("sign-for-beta.html")


@app.route("/thank-you", methods=["GET", "POST"])
def thank_you():
    # GET data from forms to be able to process and send email
    if request.method == 'POST':
        json_data = request.get_json(silent=True)
        if json_data["type"] == "contact-us":
            generate_user_contacts_us_email(name=json_data["name"],
                                            email=json_data["email"],
                                            message=json_data["message"])
        elif json_data["type"] == "sign-for-beta":
            # email us with the data
            generate_user_signed_for_beta_email(name=json_data["name"],
                                                email=json_data["email"],
                                                institution=json_data["institution"],
                                                research=json_data["research"])
            # email the user a response
            generate_signed_for_beta_feedback(name=json_data["name"],
                                              email=json_data["email"])
        elif json_data["type"] == "join-our-team":
            generate_user_joins_our_team_email(name=json_data["name"],
                                               phone=json_data["phone"],
                                               email=json_data["email"],
                                               short_bio=json_data["shortBio"])
        return jsonify({"status": 200})
    else:
        return render_template("thank-you.html", text_type=request.args.get('type'))


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        # check if the data is valid
        if request.form["username"] != "" and request.form["password"] != "":
            # Login and validate the user.
            user = User.try_login(username=request.form["username"],
                                  password=request.form["password"])
            login_user(user)
            return redirect(url_for('index'))
    else:  # if request.method == 'GET'
        try:
            if current_user.get_id() is not None:
                return redirect(url_for("index"))
            else:
                return render_template("login.html")
        except Exception as error:
            return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == 'POST':
        # ---> we assume the data is fully provided at this point and the username & email is unique <--- #
        # 0. create user
        new_user = User(username=request.form.get('username'),
                        password=request.form.get('password'),
                        name=request.form.get('name'),
                        email=request.form.get('email'),
                        creation_date=datetime.now(),
                        activated=False)
        # 1. update the db
        User.save(user=new_user)
        # 2. create user folder to get all the data into
        FolderHandler.create_folder(folder_path=new_user.get_user_folder_path())
        # 3. download template code into the folder
        github_manager = GithubPagesManager()
        github_manager.login(user_name=TEMPLATE_GITHUB_REPO_USERNAME,
                             password=TEMPLATE_GITHUB_REPO_PASSWORD)
        github_manager.download_template(download_dir=new_user.get_user_folder_path())
        # 4. send email to approve email in the user
        generate_registration_email(email=new_user.email,
                                    name=new_user.username,
                                    token=new_user.get_id())
        # Login new new user
        user = User.try_login(username=request.form["username"],
                              password=request.form["password"])
        login_user(user)
        # go to the next page after register
        return redirect(url_for('index'))
    else:  # if request.method == 'GET'
        try:
            if current_user.get_id() is not None:
                return redirect(url_for("index"))
            else:
                return render_template("login.html")
        except Exception as error:
            return render_template("login.html")


# end - website pages #

# users methods #

@login_manager.user_loader
def load_user(user_id: str):
    return User.get(user_id)


# end - users methods #

# actions methods #
@app.route("/action/upload_file_to_server_file_system", methods=["POST"])
@login_required
def upload_file_to_server_file_system():
    """
    Upload file to user's files folder.
    If file format not allowed return error.
    :return:
    """
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({"Error": "No file part in request"}), 400
        file = request.files['file']
        # if empty request return error
        if file.filename == '':
            return jsonify({"Error": "No file received."}), 400
        # if the file type allowed, save the file.
        if file and Validators.allowed_file(file.filename):
            folder_path = User.get_user_folder_path_by_id(id=current_user.get_id()) + "/files/"
            FileHandler.save_new_file(path=folder_path, file=file)
            return jsonify({"status": "file uploaded successfully"}), 200
        else:
            return jsonify({"Error": "Type of file not allowed."}), 400
    return jsonify({"Error": "Only POST request"}), 400


@app.route("/action/set_notifications_file", methods=["POST"])
@login_required
def set_notifications_file():
    """
    Set all notification file.
    Function validates if all notifications contains needed data and re-writes old file.
    If one of the notification incorrect, return error without changing the file.
    """
    if request.method == 'POST':
        if request.form["notifications"] != "":
            notifications = request.form["notifications"]
            # validate the notifications
            valid, message = Validators.validate_notifications(notifications)
            if not valid:
                jsonify({"Error": message}), 400
            # write to file
            folder_path = User.get_user_folder_path_by_id(id=current_user.get_id()) + "/data/notifications.txt"
            FileHandler.write(path=folder_path, text=notifications)
            return jsonify({"status": 200})
        else:
            jsonify({"Error": "No notifications data received"}), 400
    else:
        jsonify({"Error": "Only POST request"}), 400


@app.route("/action/set_global_seo_file", methods=["POST"])
@login_required
def set_global_seo_file():
    """
    Try to set seo info to the json global seo file of current user.
    If received data as POST data not contain all needed info or not json type- return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    data = request.get_json(silent=True)
    return update_json_file(data=data,
                            schema_name="set_global_seo",
                            target_file_path="/data/jsons/global-seo.json",
                            current_user_id=current_user.get_id(),
                            full_file=True)


@app.route("/action/set_research_file", methods=["POST"])
@login_required
def set_research_file():
    """
    Try to add whole research file info to the json research file of current user-rewrite current file.
    If the received info as POST data, not contain all needed info or not json type- return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    data = request.get_json(silent=True)
    return update_json_file(data=data,
                            schema_name="set_research_file",
                            target_file_path="/data/jsons/research.json",
                            current_user_id=current_user.get_id(),
                            full_file=True)


@app.route("/action/add_to_research_file", methods=["POST"])
@login_required
def add_to_research_file():
    """
    Try to add specific new data for specific keys to research file of current user.
    If the received info as POST data, not contain all needed info or not json type- return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    req = request.get_json(silent=True)
    return update_json_file(data=req,
                            schema_name="set_research_file",
                            target_file_path="/data/jsons/research.json",
                            current_user_id=current_user.get_id(),
                            full_file=False)


@app.route("/action/set_academic_publication_file", methods=["POST"])
@login_required
def set_academic_publication_file():
    """
    Try to set academic publications file. Re-write current file of current user.
    If received data not contain all needed info or not json type - return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    data = request.get_json(silent=True)
    return update_json_file(data=data,
                            schema_name="set_academic_publications",
                            target_file_path="/data/jsons/academic-publications.json",
                            current_user_id=current_user.get_id(),
                            full_file=True)


@app.route("/action/add_academic_publication_file", methods=["POST"])
@login_required
def add_academic_publication_file():
    """
    Try to add new academic publications file. Re-write current file of current user.
    If received data not contain all needed info or not json type - return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    data = request.get_json(silent=True)
    return update_json_file(data=data,
                            schema_name="set_academic_publications",
                            target_file_path="/data/jsons/academic-publications.json",
                            current_user_id=current_user.get_id(),
                            full_file=False)


@app.route("/action/set_teaching_file", methods=["POST"])
@login_required
def set_teaching_file():
    """
    Try to set whole teaching file. Re-write the current file with new data.
    If received data not contain all needed info or not json type - return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    data = request.get_json(silent=True)
    return update_json_file(data=data,
                            schema_name="set_teaching",
                            target_file_path="/data/jsons/teaching.json",
                            current_user_id=current_user.get_id(),
                            full_file=True)


@app.route("/action/add_new_course", methods=["POST"])
@login_required
def add_teaching_file():
    """
    Try to add or change data in teaching  json file of current user.
    Format must contain at least 1 primary key to append.
    for example: {"courses": [<new course data>] }
    If received data not contain all needed info or not json type - return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    req = request.get_json(silent=True)
    return update_json_file(data=req,
                            schema_name="set_teaching",
                            target_file_path="/data/jsons/teaching.json",
                            current_user_id=current_user.get_id(),
                            full_file=False)

# next functions updates the json files used by about.html


@app.route("/action/set_index_file", methods=["POST"])
@login_required
def set_index_file():
    """
    Try to set index json file of current user.
    Format must contain at least 1 primary key to append.
    for example: {"courses": [<new course data>] }
    If received data not contain all needed info or not json type - return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    req = request.get_json(silent=True)
    return update_json_file(data=req,
                            schema_name="set_index",
                            target_file_path="/data/jsons/index.json",
                            current_user_id=current_user.get_id(),
                            full_file=True)


@app.route("/action/add_index_file", methods=["POST"])
@login_required
def add_index_file():
    """
    Try to add to index json file of current user.
    Format must contain at least 1 primary key to append.
    for example: {"courses": [<new course data>] }
    If received data not contain all needed info or not json type - return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    req = request.get_json(silent=True)
    return update_json_file(data=req,
                            schema_name="set_index",
                            target_file_path="/data/jsons/index.json",
                            current_user_id=current_user.get_id(),
                            full_file=False)


@app.route("/action/set_lecturer_file", methods=["POST"])
@login_required
def set_lecturer_file():
    """
    Try to set lecturer json file of current user.
    Format must contain at least 1 primary key to append.
    for example: {"courses": [<new course data>] }
    If received data not contain all needed info or not json type - return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    req = request.get_json(silent=True)
    return update_json_file(data=req,
                            schema_name="set_lecturer",
                            target_file_path="/data/jsons/lecturer.json",
                            current_user_id=current_user.get_id(),
                            full_file=True)


@app.route("/action/add_lecturer_file", methods=["POST"])
@login_required
def add_lecturer_file():
    """
    Try to add to index json file of current user.
    Format must contain at least 1 primary key to append.
    for example: {"courses": [<new course data>] }
    If received data not contain all needed info or not json type - return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    req = request.get_json(silent=True)
    return update_json_file(data=req,
                            schema_name="set_lecturer",
                            target_file_path="/data/jsons/lecturer.json",
                            current_user_id=current_user.get_id(),
                            full_file=False)


@app.route("/action/set_resources_file", methods=["POST"])
@login_required
def set_resources_file():
    """
    Try to set resources json file of current user.
    Format must contain at least 1 primary key to append.
    for example: {"courses": [<new course data>] }
    If received data not contain all needed info or not json type - return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    req = request.get_json(silent=True)
    return update_json_file(data=req,
                            schema_name="set_resources",
                            target_file_path="/data/jsons/resources.json",
                            current_user_id=current_user.get_id(),
                            full_file=True)


@app.route("/action/add_resources_file", methods=["POST"])
@login_required
def add_resources_file():
    """
    Try to add to resources json file of current user.
    Format must contain at least 1 primary key to append.
    for example: {"courses": [<new course data>] }
    If received data not contain all needed info or not json type - return error.
    note: User must be logged.
    """
    # Validate the request body contains JSON
    if not request.is_json:
        return jsonify("Error", "No json data received"), 400
    # Parse the JSON into a Python dictionary
    req = request.get_json(silent=True)
    return update_json_file(data=req,
                            schema_name="set_resources",
                            target_file_path="/data/jsons/resources.json",
                            current_user_id=current_user.get_id(),
                            full_file=False)

# end of updating about.html json files

@app.route("/action/save_results", methods=["POST"])
@login_required
def action_save_results():
    file_name = 'sphera_academy_personal_website.zip'
    user_data_file = User.get_user_folder_path_by_id(id=current_user.get_id())
    # try to delete zip to make sure we override it
    try:
        FileHandler.delete_file(path=os.path.join(user_data_file, file_name))
    except Exception as error:
        # if we get here that means we do not have such file
        pass
    # zip object
    zipf = zipfile.ZipFile(file_name, 'w', zipfile.ZIP_DEFLATED)
    # zip the files in the folder
    for base, dirs, files in os.walk(user_data_file):
        for file in files:
            fn = os.path.join(base, file)
            # make sure this is not zip file - should not happen but in case
            if not file.endswith(".zip"):
                zipf.write(os.path.join(fn, file))
    return send_from_directory(os.path.join(user_data_file, file_name),
                               file_name,
                               mimetype="zip",
                               attachment_filename=file_name,
                               as_attachment=True)


@app.route("/action/upload_to_our_github_repo", methods=["POST"])
@login_required
def upload_to_our_github_repo():
    try:
        # get the account from the db
        user = User.get(user_id=current_user.get_id())

        github_manager = GithubPagesManager()
        # login to our account
        github_manager.login(user_name=TEMPLATE_GITHUB_REPO_EMAIL,
                             password=TEMPLATE_GITHUB_REPO_PASSWORD)
        # if first time, open repo
        if not user.uploaded_to_our_github:
            # open repo
            github_manager.add_repository(repo_name=USER_REPO_NAME.format(user.id),
                                          description=USER_REPO_DESCRIPTION.format(user.name))
            # open github pages
            github_manager.start_github_pages(user_name=TEMPLATE_GITHUB_REPO_USERNAME,
                                              repo_name=USER_REPO_NAME.format(user.id))
            # update DB about this
            user.uploaded_to_our_github = True
            User.update_user(user=user)
        # upload the code into the repo
        OsGitManager.upload_repo(user.id)
        # return all good
        return jsonify({"update_repo": USER_REPO_NAME.format(user.id)}), 200
    except Exception as error:
        return jsonify("error", error), 400


@app.route("/action/upload_to_own_github_repo", methods=["POST"])
@login_required
def upload_to_own_github_repo():
    try:
        # get the account from the db
        user = User.get(user_id=current_user.get_id())
        github_manager = GithubPagesManager()
        # login to our account
        github_manager.login(user_name=request.form.get("username"),
                             password=request.form.get("password"))
        # if first time, open repo
        if not user.uploaded_to_own_github:
            # open repo
            github_manager.add_repository(repo_name=USER_REPO_NAME.format(user.id),
                                          description=USER_REPO_DESCRIPTION.format(user.name))
            # open github pages
            github_manager.start_github_pages(user_name=TEMPLATE_GITHUB_REPO_USERNAME,
                                              repo_name=USER_REPO_NAME.format(user.id))
            # update DB about this
            user.uploaded_to_own_github = True
            User.update_user(user=user)
        # upload the code into the repo
        OsGitManager.upload_repo(user.id)
        # return all good
        return jsonify({"update_repo": USER_REPO_NAME.format(user.id)}), 200
    except Exception as error:
        return jsonify("error", error), 400


@app.route("/action/create_user", methods=["GET", "POST"])
def create_user():
    user_manipulator.create_new_user('test_user')
    return 'user created'


@app.route("/action/update_user", methods=["GET", "POST"])
def update_user():
    user_manipulator.update_user_data('test_user')
    return 'user updated'


# end - actions methods #

# help functions #

def update_json_file(data: dict, schema_name: str, target_file_path: str, current_user_id: str, full_file: bool):
    """
    Try to Update json file with recived data. If full-file, re write the file. else: add or change only specific data
    inside the json file.
    If the data in incorrect format or not contain all needed info, return error.
    note: when full file is false, data must contain at least one key.
    You cant change specific inner sub key inside json file.
    :param data: Json data received from user in dict type.
    :param schema_name: key to untils/validators json scheme file. see validators.py
    :param target_file_path: target path of the user's local json file needed update.
    :param current_user_id:
    :param full_file: true if full file needs to re-write.
    :return: status.
    """
    try:
        # check if the new data correct and contains all needed data
        Validators.json_validates(schema_name, data)
        # add the new data to current_user json file.
        folder_path = User.get_user_folder_path_by_id(id=current_user_id)
        if full_file:
            FileHandler.write_to_json(json_data=data, path=folder_path + target_file_path)
        else:
            FileHandler.append_to_json(data_obj_to_append=data, path=folder_path + target_file_path)
        return jsonify({"status": 200})
    except ValidationError as validation_error:
        return jsonify({"Error": validation_error.message}), 400
    except Exception as e:
        print(e)
        return jsonify({"Error": str(e)}), 400


# end - help functions #


class User(UserMixin):
    """
    The user of the system (and as saved in the DB)
    """

    password_salt = b'\xa1\x87\xa8JGG\x1e\xa2\xd6/_\x03\x06+\xd1)\x9e\xa8\x15s\xe9Q\x8f\xcbZu!\xd4\xb0\x8c\x1e\xd7'

    def __init__(self,
                 username: str,
                 password: str,
                 email: str,
                 name: str,
                 creation_date: datetime,
                 reset_link: str = "",
                 activated: bool = False,
                 uploaded_to_our_github: bool = False,
                 uploaded_to_own_github: bool = False,
                 id: str = None):
        super().__init__()
        self.id = uuid.uuid1().hex if id is None else id
        self.username = username
        self.email = email
        self.name = name
        self.reset_link = reset_link
        self.creation_date = creation_date
        self.activated = activated
        self.uploaded_to_our_github = uploaded_to_our_github
        self.uploaded_to_own_github = uploaded_to_own_github

        # salt, hashed_password = User.hash_password(password) ->> not working. hash return only password
        hashed_password = User.hash_password(password)
        self.password = hashed_password
        # self.salt = salt

    def get_user_folder_path(self) -> str:
        return PathHandler.get_relative_path_from_project_inner_folders(["users_websites", self.id])

    @staticmethod
    def get_user_folder_path_by_id(id: str) -> str:
        return PathHandler.get_relative_path_from_project_inner_folders(["users_websites", id])

    @staticmethod
    def get(user_id):
        return mongo.db.users.find_one_or_404({"user_id": user_id})

    @staticmethod
    def update_user(user):
        # TODO: update the user's data
        pass

    # TODO: maybe delete it
    @staticmethod
    def create_user_data_dir(user_id: str) -> bool:
        try:
            os.makedirs(path=r"../data/users/{}".format(re.sub(r'[^\w\d-]', '_', user_id)))
            return True
        except Exception as error:
            print("Already have file for user with id: {}".format(user_id))
            return False

    # TODO: maybe delete it
    @staticmethod
    def get_user_data_dir(user_id: str) -> str:
        wanted_path = os.path.abspath(r"../data/users/{}".format(re.sub(r'[^\w\d-]', '_', user_id)))
        if os.path.exists(wanted_path):
            return wanted_path
        raise IOError("Not such folder for user with id = {}".format(user_id))

    @staticmethod
    def try_login(username: str,
                  password: str):
        return mongo.db.users.find_one_or_404({"username": username,
                                               "password": User.hash_password(password)})

    @staticmethod
    def hash_password(password: str):
        return hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), User.password_salt, 100000)

    @staticmethod
    def save(user):
        mongo.db.users.insert(vars(user))

    # ---> python methods <--- #

    def __repr__(self) -> str:
        return "<User>"

    def __str__(self) -> str:
        return "<User | id: {}>".format(self.get_id())

    # ---> end - python methods <--- #


if __name__ == '__main__':
    app.run(debug=False)
