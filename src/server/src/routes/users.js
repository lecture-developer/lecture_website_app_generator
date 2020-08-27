import express from "express";
import User from "../models/user";
import { registerValidtion, loginValidation } from "../../validation";
import bcrypt from "bcryptjs";
import mailgun from "mailgun-js";
import jwt from "jsonwebtoken";
import { generateRegistrationEmail, generateForgotPasswordEmail } from "../resources/emails";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: process.env.MAILGUN_DOMAIN,
});

// Hash passwords
const hashPassword = (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  return hashedPassword;
};

// Register user
router.post("/register", async (req, res) => {
  console.log("trying to register user: ");

  // Validate data
  const { error } = registerValidtion(req.body);
  if (error) return res.send(error.details[0].message);

  // Checking if user is already in db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Hash passwords
  const hashedPassword = hashPassword(req.body.password);

  // Create new user
  const newUser = new User({
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    try {
      console.log("Trying to send email to user");
      const { name, email, password } = req.body;
      const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACC_ACTIVATE,
        { expiresIn: "20m" }
      );

      const data = generateRegistrationEmail(email, name, token);
      await mg.messages().send(data, function (error, body) {
        console.log(body);
      });
    } catch (err) {
      console.log("Sending email failed with error: " + err);
    }
  } catch (err) {
    console.log("failed to save user");
    console.log(err);
    res.send(err);
  }
  return res.send("Email verification sent, please check your email");
});

// Login user
router.post("/login", async (req, res) => {
  console.log("trying to login user: " + req.body.email);

  // Validate data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email address exists in db
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("Email not found");

  // Check if password is correct
  try {
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.send("Incorrect password");
  } catch (err) {
    console.log(err);
    return res.send("Error occured");
  }

  console.log("login process completed");
  return res.send("Logged in!");
});

// Email activation after regestration
router.post("/activation", async (req, res) => {
  console.log("Trying to activate user...");
  const token = req.body.token;
  // Check if activation token is correct
  if (token) {
    try {
      await jwt.verify(token, process.env.JWT_ACC_ACTIVATE);
      console.log("Activation success");
    } catch (err) {
      console.log(err);
      return res.send("Incorrect or expired link" );
    }
  } else {
    console.log("activation error");
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
      console.log(err);
      return res.send("Error occured");
    }
    
    // Generate email with rese password link
    const data = generateForgotPasswordEmail(emailExist.email, emailExist.name, token);
    await mg.messages().send(data, function (error, body) {
      console.log(body);
    });
    return res.send("Mail sent!")
});

// Given a token, allows password change for the appropriate user matching the token
router.post('/change-password', async (req, res) => {
  console.log("Trying to change the user password...");
  const resetLink = req.body.token;
  const newPassword = req.body.newPassword;

  if(resetLink) {
    // Verifing the reset link
    try {
      await jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY);
    } catch (err) {
      console.log(err);
      return res.send("Incorrect or expired toekn");
    }

    // Finding the user
    const user = await User.findOne({ resetLink: resetLink });
    if(!user) return res.send("Bad token");

    // Hash passwords
    const newHashedPassword = hashPassword(newPassword);

    // Updating the password
    try{
      await user.updateOne({password: newHashedPassword});
    } catch(err) {
      console.log(err);
      return res.send("Error changing password");
  }
}
  else {
    return res.send("Authentication error");
  }
});

export default router;
