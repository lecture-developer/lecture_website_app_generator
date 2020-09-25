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

    //set min time
    let min = new Date(); 
    const gracePeriod = 24*60*60 * 1000 * process.env.DAYS_DELETE_UNACTIVED_USERS
    min.setTime(now.getTime() - gracePeriod);

    // go over all unactivated users and delete all that didnt activate in the grace period
    for await (const doc of User.find({creationDate: {$gt: min, $lt: now}})) {
        try {
            const { name } = doc
            logger.info("deleting user " + name)
            await User.deleteOne(doc)
        } catch(error) {
            logger.error("error deleting user, info:\n" + error)
        }
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
    cron.schedule('0 0 10 * *', async () => {
        // Send e-mail activation reminders
        logger.info("CRON JOB : Sending email activation reminders...");
        const newUsers = getNewNotActivated();
        await sendEmailToNewNotActivated(newUsers);
    }),
    cron.schedule('0 0 11 * *', async () => {
        // delete unactived users after DAYS_DELETE_UNACTIVED_USERS days
        logger.info("deleting old not activated users...");
        await removeOldNotActivated();
    })
};

export default scheduleJobs;