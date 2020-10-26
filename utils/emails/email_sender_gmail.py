import smtplib


class EmailSenderGmail:
    """
    SMTP email sender using Google's API
    """

    # ---> CONSTS <--- #

    GMAIL_SMTP_URL = "smtp.gmail.com"
    GMAIL_SMTP_PORT = 465

    GMAIL_USER = "lecturers.generator@gmail.com"
    GMAIL_PASSWORD = "generator123"

    # ---> END - CONSTS <--- #

    def __init__(self):
        pass

    @staticmethod
    def send_email_via_gmail(to, subject, text):
        """ Send an email to someone with given title and text using the Gmail API SMTP """

        if to is None:
            to = EmailSenderGmail.GMAIL_USER

        try:
            server = smtplib.SMTP_SSL(
                EmailSenderGmail.GMAIL_SMTP_URL, EmailSenderGmail.GMAIL_SMTP_PORT
            )
            server.ehlo()
            # login to my gmail account
            server.login(
                EmailSenderGmail.GMAIL_USER,
                EmailSenderGmail.GMAIL_PASSWORD,
            )
            # send the email itself
            server.sendmail(
                EmailSenderGmail.GMAIL_USER, to, subject + "\n\n\n" + text
            )
            # close connection
            server.close()
        except ConnectionError:
            print("Could not get the Gmail SMTP connection")

    @staticmethod
    def send_email_via_gmail_list(to_list, subject, text):
        """ Send an email to list of people with given title and text using the Gmail API SMTP """
        for to_email in to_list:
            EmailSenderGmail.send_email_via_gmail(to_email, subject, text)
