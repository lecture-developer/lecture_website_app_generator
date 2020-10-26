from utils.emails.email_sender_gmail import EmailSenderGmail

DOMAIN = "https://sphera.academy"


def generate_registration_email(email, name, token):
    EmailSenderGmail.send_email_via_gmail(to=email,
                                          subject="Hi {}, please verify your Lecture Website App Generator account".format(name),
                                          text="<h1>Hi, {}</h1><p>Thanks for using Lecture Website App Generator!Please confirm your email address by clicking on the link below:</p><p>{}/users/activation/{}</p><p>Happy generating,The Lecture Website App Generator team</p>`".format(name, DOMAIN, token))


def generate_db_connection_failed_email(err):
    EmailSenderGmail.send_email_via_gmail(to=None,
                                          subject="DB connection failed",
                                          text="DB connection failed with error: {}".format(err))


def generate_forgot_password_email(email, name, token):
    # TODO: fix here later
    EmailSenderGmail.send_email_via_gmail(to=email,
                                          subject="Forgot your password?",
                                          text="{}/users/chage-password/{}".format(DOMAIN, token))


def generate_new_not_activated_email(email, name, token):
    # TODO: fix here later
    EmailSenderGmail.send_email_via_gmail(to=email,
                                          subject="Hi {}, please verify your Lecture Website App Generator account".format(name),
                                          text="{}/users/activation/{}".format(DOMAIN, token))


def generate_user_signed_for_beta_email(name, email, institution, research):
    EmailSenderGmail.send_email_via_gmail(to=None,
                                          subject="{} signed up for beta access".format(name),
                                          text="A user has signed up for beta access. Here are his details:\n\nName: {}\nEmail: {}\nMain academic institution: {}\nMain research intrest: {} ".format(name, email, institution, research))


def generate_user_joins_our_team_email(name, phone, email, short_bio):
    EmailSenderGmail.send_email_via_gmail(to=None,
                                          subject="{} wants to join our team".format(name),
                                          text="A user wants to join our team. Here are his details:n\nName: {}\nEmail: {}\nPhone: {}\nShort bio: {} ".format(name, email, phone, short_bio))


def generate_user_contacts_us_email(name, email, message):
    EmailSenderGmail.send_email_via_gmail(to=None,
                                          subject="{} - contact us".format(name),
                                          text="A user wants to contact us. Here are his details: n\nName: {}\nEmail: {}\nmessage: {}".format(name, email, message))
