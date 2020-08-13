# library imports
import os
import json
import math
import random
import zipfile
import urllib.parse
from glob import glob
from urllib import request
from datetime import datetime, date
from flask import Flask, redirect, url_for, session, render_template, make_response, request, jsonify, send_file

from services.emails.email_sender import EmailProvider


# SYSTEM CONSTS #
IS_DEBUG_MODE = False
SECRET_KEY = "development key"
# time
time_str_format = "%d-%b-%Y (%H:%M:%S.%f)"
# END - SYSTEM CONSTS #

# ---> init the server <--- #

# get the app engine
app = Flask(__name__)

# ---> services
# init the email provider
smtp = EmailProvider()
# tell if debug or production
app.debug = IS_DEBUG_MODE
# tell the system's secret key
app.secret_key = SECRET_KEY
# ---> DB models <--- #


# ---> front pages  <--- #

@app.errorhandler(404)
def page_not_found(error: str):
    return render_template("404.html", message="<b>Error 404</b> - Page not found | {}".format(error)), 404


@app.route("/", methods=["GET", "POST"])
def index():
    """ main website page """
    answer = make_response(render_template("index.html"))
    answer.set_cookie('ip', get_my_ip())
    return answer


@app.route("/create_website", methods=["GET", "POST"])
def create_website():
    answer = make_response(render_template("create_website.html"))
    answer.set_cookie('ip', get_my_ip())
    return answer


@app.route("/create_app", methods=["GET", "POST"])
def create_app():
    answer = make_response(render_template("create_app.html"))
    answer.set_cookie('ip', get_my_ip())
    return answer


@app.route("/upload_website", methods=["GET", "POST"])
def upload_website():
    answer = make_response(render_template("upload_website.html"))
    answer.set_cookie('ip', get_my_ip())
    return answer


@app.route("/upload_app", methods=["GET", "POST"])
def upload_app():
    answer = make_response(render_template("upload_app.html"))
    answer.set_cookie('ip', get_my_ip())
    return answer


@app.route("/about_us", methods=["GET", "POST"])
def about_us():
    answer = make_response(render_template("about_us.html"))
    answer.set_cookie('ip', get_my_ip())
    return answer

# ---> OPERATION METHODS <--- #


@app.route("/download_website", methods=["GET", "POST"])
def download_website():
    source_data = os.path.join(os.path.dirname(__file__), "data")
    zip_file_name = "website.zip"
    # zip all images
    zipf = zipfile.ZipFile(zip_file_name, 'w', zipfile.ZIP_DEFLATED)
    for root, dirs, files in os.walk(source_data):
        for file in files:
            zipf.write(os.path.join(source_data, file))
    # finish the zip file
    zipf.close()
    return send_file(zip_file_name,
                     mimetype='zip',
                     attachment_filename='posts_{}.zip'.format(datetime.now().strftime(time_str_format)),
                     as_attachment=True)


# ---> END - OPERATION METHODS <--- #

# ---> global help functions <--- #


@app.route("/get_my_ip", methods=["GET"])
def get_my_ip():
    return request.remote_addr


@app.route('/getcookie/<cookie_key>')
def get_cookie(cookie_key: str):
    return request.cookies.get(cookie_key)


# ---> end - global help functions <--- #


# for init the server
if __name__ == "__main__":
    app.run()
