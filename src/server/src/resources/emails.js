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

export const generateForgotPasswordEmail = (email, name, token) => {
  return {
    from: "Lecture Website App Generator <me@samples.mailgun.org>",
    to: email,
    subject: "Forgot your password?",
    html: `<h1>Hi ${name}, </h1>
            <p>Forgot your password?</p>
            <p>no worries, click on the link bellow and we'll help you set you up with a new one:</p>
            <p>${process.env.CLIENT_URL}/users/change-password/${token}</p>
            <p>Happy generating,
            The Lecture Website App Generator team</p>`,
  };
};

export const generateNewNotActivatedEmail = (email, name, token) => {
  return {
    from: "Lecture Website App Generator <eyalgolan96@gmail.com>",
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

export const generateUserSignedForBetaEmail = (name, email, institution, research) => {
  return {
    from: "Lecture Website App Generator <me@samples.mailgun.org>",
    to: "eyalgolan96@gmail.com",
    subject: `${name} signed up for beta access`,
    html: `<h1> Hi, </h1>
        <p> A user has signed up for beta access. Here are his deatils: </p>
        <p> Name: ${name} </p>
        <p> Email: ${email} </p>
        <p> Main academic instutution: ${institution} </p>
        <p> Main research interest: ${research} </p>`
  };
};

export const generateUserJoinsOurTeamEmail = (name, phone, email, shortBio) => {
  return {
    from: "Lecture Website App Generator <me@samples.mailgun.org>",
    to: "eyalgolan96@gmail.com",
    subject: `${name} wants to join our team`,
    html: `<h1> Hi, </h1>
        <p> A user wants to join our team. Here are his details: </p>
        <p> Name: ${name} </p>
        <p> Email: ${email} </p>
        <p> Phone: ${phone} </p>
        <p> Short bio: ${shortBio} </p>`
  };
};
