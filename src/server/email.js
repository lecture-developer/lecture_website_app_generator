import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();

/*
* email configuration - using gmail's api with nodemailer
*/
export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        type: process.env.SMTP_AUTH_TYPE,
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
    }
  });

  /* 
* Gets email details and sends it
*/
export const sendMail = (transporter, data) => {
    transporter.sendMail(data, function(err, info){
      if(err) {
        logger.error("Sending email failed with error: " + err);
      } else {
        logger.info('Email sent');
      }
    });
  };