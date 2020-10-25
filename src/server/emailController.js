import nodemailer from 'nodemailer'
import logger from './logger';
import dotenv from "dotenv";
import { google } from 'googleapis'
dotenv.config();

var mailClient = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	}
});

/* 
* email controller configuration - using gmail's api with nodemailer
*/
const Mailing = {};

//Gets email details and sends it
Mailing.sendEmail = data => {	
	mailClient.sendMail(mailOptions, function(error, info)
	{
		if (error) 
		{
			logger.error("Sending email failed with error: " + err);
		} 
		else 
		{
			console.log('Email sent: ' + info.response);
		}
	});
};

export default Mailing;