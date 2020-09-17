import express from "express";
import User from "../models/user";
import { registerValidtion, loginValidation } from "../../validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateRegistrationEmail, generateForgotPasswordEmail } from "../resources/emails";
import dotenv from "dotenv";
dotenv.config();
import logger from '../../logger';
import Mailing from '../../emailController'

const router = express.Router();

/*
* Gets password, Hash it and returns the hased password
*/
const hashPassword = async (password) => {
  // TODO: 10 is the default value, we will need to check performance and see if it can be higher 
  logger.info("hasing password");
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

// Register user
router.post("/register", async (req, res) => {
  logger.info("trying to register user... ");

  // Validate data
  const { error } = registerValidtion(req.body);
  if (error){
    logger.info("error during validation");
    return res.send(error.details[0].message);
  }

  // Checking if user is already in db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist){
    logger.info("Email already exists");
    return res.send("Email already exists");
  } 

  // Hash passwords
  const hashedPassword = await hashPassword(req.body.password);

  // Create new user
  const newUser = new User({
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email
  });

  try {
    await newUser.save();
  } catch(err) {
    logger.error("failed to save user, got error: " + err);
    return res.send("error occured");
  }
  
  logger.info("Trying to send email to user");
  const { name, email, password } = req.body;

  const token = jwt.sign(
    { name, email, password },
    process.env.JWT_ACC_ACTIVATE,
    { expiresIn: "20m" });

  const data = generateRegistrationEmail(email, name, token);
  Mailing.sendMail(data);

  return res.send("Email verification sent, please check your email");
});

// Login user
router.post("/login", async (req, res) => {
  logger.info("trying to login user");

  // Validate data
  const { error } = loginValidation(req.body);
  const httpStatusCode = 400;
  if (error) {
    logger.info("user validation failed");
    return res.status(httpStatusCode).send(error.details[0].message);
  }
  // Check if email address exists in db
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    logger.info("email not found");
    return res.send("Email not found");
  }
  // Check if password is correct
  try {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.send("Incorrect password");
  } catch (err) {
    logger.error("Error during validation: " + err);
    return res.send("Error occured");
  }

  logger.info("login process completed");
  return res.send("Logged in!");
});

// Email activation after regestration
router.post("/activation", async (req, res) => {
  logger.info("Trying to activate user...");
  const token = req.body.token;
  // Check if activation token is correct
  if (token) {
    try {
      await jwt.verify(token, process.env.JWT_ACC_ACTIVATE);
      logger.info("Activation success");
    } catch (err) {
      logger.error(err);
      return res.send("Incorrect or expired link" );
    }
  } else {
    logger.error("activation error");
    return res.send("Activation error");
  }
});

// Email if user forgot password
router.post('/send-forgot-password-email', async (req, res) => {
    // Checking if user is in db
    const emailExist = await User.findOne({ email: req.body.email });
    if (!emailExist) return res.send("Email doesn't belong to any registered user");
    const { name, email, password } = emailExist;
    const token = jwt.sign(
      { name, email, password },
      process.env.RESET_PASSWORD_KEY,
      { expiresIn: "20m" }
    );
    
    // Update reset link field
    try {
      await emailExist.updateOne({resetLink: token});
    } catch(err) {
      logger.error(err);
      return res.send("Error occured");
    }
    
    // Generate email with rese password link
    const data = generateForgotPasswordEmail(emailExist.email, emailExist.name, token);
    Mailing.sendMail(data);
    return res.send("Mail sent!")
});

// Given a token, allows password change for the appropriate user matching the token
router.post('/change-password', async (req, res) => {
  logger.info("Trying to change the user password...");
  const resetLink = req.body.token;
  const newPassword = req.body.newPassword;

  if(resetLink) {
    // Verifing the reset link
    try {
      await jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY);
    } catch (err) {
      logger.error(err);
      return res.send("Incorrect or expired token");
    }

    // Finding the user
    const user = await User.findOne({ resetLink: resetLink });
    if(!user) return res.send("Bad token");

    // Hash passwords
    const newHashedPassword = await hashPassword(newPassword);

    // Updating the password
    try{
      await user.updateOne({password: newHashedPassword});
    } catch(err) {
      logger.error(err);
      return res.send("Error changing password");
  }
}
  else {
    return res.send("Authentication error");
  }
});

export default router;
