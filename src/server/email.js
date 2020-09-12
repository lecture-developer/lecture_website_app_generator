import nodemailer from 'nodemailer'
import dotenv from "dotenv";
import logger from './logger';
dotenv.config();

/*
* email configuration - using gmail's api with nodemailer
*/
const transporter = nodemailer.createTransport({
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

  export default transporter;