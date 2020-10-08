import nodemailer from 'nodemailer'
import logger from './logger';
import dotenv from "dotenv";
import { google } from 'googleapis'
dotenv.config();

const { OAuth2 } = google.auth;
const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.OAUTH,
  );

/* 
* email controller configuration - using gmail's api with nodemailer
*/
const Mailing = {};

//Gets email details and sends it
Mailing.sendEmail = data => {
    // setting the refresh token
    oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
    });
    // getting the access token
    const accessToken = oauth2Client.getAccessToken();

    // create the auth object
    const auth = {
        type: process.env.SMTP_AUTH_TYPE,
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken,
    };

    // create the transporter object
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        service:process.env.SMTP_HOST,
        auth: auth,
      });
    transporter.sendMail(data, function(err, info){
      if(err) {
        logger.error("Sending email failed with error: " + err);
      } else {
        logger.info('Email sent');
      }
    });
  };

  export default Mailing;