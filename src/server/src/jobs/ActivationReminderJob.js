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
* delete all users that didnt activate after DAYS_DELETE_UNACTIVED_USERS
*/
const removeOldNotActivated = async () => {
    let now = new Date(); // get current time

    // calculate the min time - current time minus
    // the number of milliseconds in a day times the number of days
    let min = new Date(); 
    const numMillisecondsInDay = 86400000; // 24*60*60*1000;
    const gracePeriod = numMillisecondsInDay * process.env.DAYS_DELETE_UNACTIVED_USERS;
    min.setTime(now.getTime() - gracePeriod);

    // delete all users that didnt activate in the grace period
    try {
        await User.deleteMany({creationDate: {$gt: min, $lt: now}})
    } catch(error) {
        logger.error("error deleting users, info:\n" + error)
    }
};

/*
* Send email reminder to all users that didnt activate their account
*/
const sendEmailToNewNotActivated = async (newUsers) => {
    for await (const doc of User.find({activated: false})) {
        const { name, email, password } = doc;
        const token = generateToken(name, email, password);
        const data = generateNewNotActivatedEmail(name, email, token);
        Mailing.sendEmail(transporter, data);
        logger.info("sent mail " + data);
    }
}

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
export const scheduleJobs = async () => {
    cron.schedule(process.env.REMIND_USERS_TO_ACTIVATE_DAYS, async () => {
        // Send e-mail activation reminders
        logger.info("CRON JOB : Sending email activation reminders...");
        const newUsers = getNewNotActivated();
        await sendEmailToNewNotActivated(newUsers);
    }),
    cron.schedule(process.env.DELETE_UNACTIVATED_USERS_DAYS, async () => {
        // delete unactived users after DAYS_DELETE_UNACTIVED_USERS days
        logger.info("deleting old not activated users...");
        await removeOldNotActivated();
    })
};

export default scheduleJobs;