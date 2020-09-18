import cron from 'node-cron';
import Mailing from '../../emailController'
import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import logger from '../../logger';
import { generateNewNotActivatedEmail } from "../resources/emails";
/*
* Returns users that didnt activate their account
*/
const getNewNotActivated = async () => {
    const users = await User.find({activated: false});
    logger.info(users);
    return users;
};

/*
* Generate an activation token and returns it
*/
const generateToken = (name, email, password) => {
    const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACC_ACTIVATE,
        { expiresIn: "60m" });
    return token;
};


/*
* cron job that runs every day and sends email activation reminder
* to users that didnt activate their account
*/
const scheduleJobs = async () => {
    cron.schedule('* * * * *', () => {
        // Send e-mail
        logger.info("Sending email activation reminders...");
        const newUsers = getNewNotActivated();
        for(let i = 0 ; i < newUsers.length ; i++) {
            const { name, email, password } = newUsers[i];
            logger.info(name);
            const token = generateToken(name, email, password);
            const data = generateNewNotActivatedEmail(name, email, token);
            Mailing.sendMail(transporter, data);
        }

        //data = generateOldNotActivatedEmail(newUsers);
    });
};

export default scheduleJobs;