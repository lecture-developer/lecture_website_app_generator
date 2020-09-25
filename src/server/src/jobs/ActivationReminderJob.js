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

const getOldNotActivated = async () => {
    let now = new Date();
    let min = new Date();
    min.setTime(now.getTime() - 24*60*60 * 1000);
    const users = await User.find({date: {$gt: min, $lt: now}});

    for( let i = 0 ; i < users.length ; i++) {
        const { creationDate } = users[i].date
        logger.info(users[i].date)
    }
};

const sendEmailToNewNotActivated = async (newUsers) => {
    for(let i = 0 ; i < newUsers.length ; i++) {
        const { name, email, password } = newUsers[i];
        const token = generateToken(name, email, password);
        const data = generateNewNotActivatedEmail(name, email, token);
        Mailing.sendEmail(transporter, data);
        logger.info("sent mail " + data)
    }
}

const removeOldNotActivated = async (oldNotActivated) => {
    for( let i = 0 ; i < oldNotActivated.length ; i++) {
        const { name, email, password } = oldNotActivated[i]; 
        logger.info("deleting " + name + " ...")
        try {
            const deletionResult = await User.deleteOne(name);
        }
        catch(error) {
            logger.error("failed to delete user " + name + "\n exception details: " + error)
        }
    }
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
export const scheduleJobs = async () => {
    cron.schedule('0 0 10 * *', async () => {
        // Send e-mail activation reminders
        logger.info("CRON JOB : Sending email activation reminders...");
        const newUsers = getNewNotActivated();
        await sendEmailToNewNotActivated(newUsers)
    }),
    cron.schedule('* * * * *', async () => {
        logger.info("deleting old not activated users...")
        const oldNotActivated = getOldNotActivated();
        await removeOldNotActivated(oldNotActivated)
    })
};

export default scheduleJobs;