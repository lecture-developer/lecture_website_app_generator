import cron from 'node-cron';
import {transporter, sendMail} from './email'
import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getNewNotActivated = () => {
    const users = await User.find({activated: false}).toArray();
    return users;
};

const generateToken = (name, email, password) => {
    const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACC_ACTIVATE,
        { expiresIn: "60m" });
    return token;
};

cron.schedule('* * * * *', () => {
    // Send e-mail
    const newUsers = getNewNotActivated();
    for(let i = 0 ; i < newUsers.length ; i++) {
        const { name, email, password } = newUsers[i];
        const token = generateToken(name, email, password);
        const data = generateNewNotActivatedEmail(name, email, password);
    }
    sendMail(transporter, data);

    //data = generateOldNotActivatedEmail(newUsers);
});