from utils.emails.email_sender_gmail import EmailSenderGmail


class EmailProvider:
    """ single function file to send an email using some smtp """

    # CONSTS #
    GOOGLE_PROVIDER = "gmail"
    SENDGRID_PROVIDER = "sendgrid"
    # END - CONSTS #

    def __init__(self):
        self.sent_count_google = 0

    def send_email(self, to, subject, text, provider=GOOGLE_PROVIDER):
        """ Send an email to someone with given title and text """
        provider = provider.strip().lower()
        if provider == EmailProvider.GOOGLE_PROVIDER:
            EmailSenderGmail.send_email_via_gmail(to, subject, text)
            self.sent_count_google = self.sent_count_google + 1
        else:
            raise AttributeError("please pick on of the providers we have")

    def send_email_list(self, to_list, subject, text, provider=GOOGLE_PROVIDER):
        """ Send an email to list of people with given title and text"""
        provider = provider.strip().lower()
        if provider == EmailProvider.GOOGLE_PROVIDER:
            EmailSenderGmail.send_email_via_gmail_list(to_list, subject, text)
            self.sent_count_google = self.sent_count_google + len(to_list)
        else:
            raise AttributeError("please pick on of the providers we have")

    # ---> getters <--- #

    def get_sent_count_google(self):
        return self.sent_count_google

    # ---> end - getters <--- #
