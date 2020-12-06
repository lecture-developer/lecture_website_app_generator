# library imports
import re
import os
import uuid
import hashlib
import enum
import json
import atexit
import requests
from flask_login import UserMixin
from flask_pymongo import PyMongo
from datetime import datetime, timedelta
from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, request, render_template, jsonify, send_from_directory, redirect, url_for, session, abort, make_response
from flask_login import LoginManager, login_user, logout_user, login_required, current_user

from website_generator.pages.index_page import IndexPage

# project imports
from installer import install_server
from web_logic.enums import *
from web_logic.email_templates import *

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


# end - website pages #

# users methods #

@login_manager.user_loader
def load_user(user_id: str):
    return User.get(user_id)

# end - users methods #

# actions methods #


@app.route("/action/save_results", methods=["GET", "POST"])
@login_required
def action_save_results():
    return send_from_directory(directory="",
                               filename="")

# end - actions methods #

# help functions #

def save_index_data():
    if request.method == 'POST':
        # TODO: logic that gets 4 jsons and sets them to IndexPage object


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
                 creationDate: datetime,
                 activated: bool = False,
                 resetLink: str = "",
                 id: str = None):
        super().__init__()
        self.id = uuid.uuid1().hex if id is None else id
        self.username = username
        self.email = email
        self.resetLink = resetLink
        self.creationDate = creationDate
        self.activated = activated

        salt, hashed_password = User.hash_password(password)
        self.password = hashed_password
        self.salt = salt

    @staticmethod
    def get(user_id):
        return mongo.db.users.find_one_or_404({"user_id": user_id})

    @staticmethod
    def create_user_data_dir(user_id: str) -> bool:
        try:
            os.makedirs(path=r"../data/users/{}".format(re.sub(r'[^\w\d-]', '_', user_id)))
            return True
        except Exception as error:
            print("Already have file for user with id: {}".format(user_id))
            return False

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
    def hash_password(password: str) -> tuple:
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
    app.run(debug=True)
