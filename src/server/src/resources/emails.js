import dotenv from "dotenv";
dotenv.config();

export const generateRegistrationEmail = (email, name, token) => {
  return {
    from: "Lecture Website App Generator <me@samples.mailgun.org>",
    to: email,
    subject: `Hi ${name}, please verify your Lecture Website App Generator account`,
    html: `<h1>Hi,</h1>
        <p>Thanks for using Lecture Website App Generator!
        Please confirm your email address by clicking on the link below:</p>
        <p>${process.env.CLIENT_URL}/users/activation/${token}</p>
        <p>Happy generating,
        The Lecture Website App Generator team</p>`,
  };
};

export const generateDbConnectionFailedEmail = (err) => {
  return {
    from: "Lecture Website App Generator <me@samples.mailgun.org>",
    to: "eyalgolan96@gmail.com",
    subject: "DB connection failed",
    html: `<h1>Hi,</h1>
            <p>DB connection failed with error:</p>
            <p>${err}</p>`,
  };
};
