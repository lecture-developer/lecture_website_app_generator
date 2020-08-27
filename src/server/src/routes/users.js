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

// Register user
router.post("/register", async (req, res) => {
  console.log("trying to register user: ");
  console.log("name: " + req.body.name);
  console.log("email: " + req.body.email);
  // Validate data
  const { error } = registerValidtion(req.body);
  if (error) return res.send(error.details[0].message);

  // Checking if user is already in db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

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
      const mg = mailgun({
        apiKey: process.env.MAILGUN_APIKEY,
        domain: process.env.MAILGUN_DOMAIN,
      });
      const data = generateRegistrationEmail(email, name, token);
      console.log(data);
      await mg.messages().send(data, function (error, body) {
        console.log(body);
      });
    } catch (err) {
      console.log("Sending email failed with error: " + err);
    }
    res.send(savedUser);
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
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("According to the email, found user: " + user);
    if (!user) return res.status(400).send("Email not found");
    console.log("passed search in db...");
    // Check if password is correct
    try {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) return res.status(400).send("Incorrect password");
      console.log("passed password validation...");
    } catch (err) {
      console.log("failed to validate user password during the login process");
      console.log(err);
      res.send(err);
    }
  } catch (err) {
    console.log("failed to find user during the login process");
    console.log(err);
    res.send(err);
  }
  console.log("login process completed");
  res.send("Logged in!");
  console.log("logged in");
});

// Email activation after regestration
router.post("/activation", async (req, res) => {
  console.log("Trying to activate user...");
  const token = req.body.token;
  console.log(token);
  // Check if activation token is correct
  if (token) {
    try {
      const res = await jwt.verify(token, process.env.JWT_ACC_ACTIVATE);
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
    console.log(emailExist);
    if (!emailExist) return res.send("Email doesn't belong to any registered user");
    const { name, email, password } = emailExist;
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACC_ACTIVATE,
      { expiresIn: "20m" }
    );
    
    try {
      await emailExist.updateOne({resetLink: token});
    } catch(err) {
      console.log(err);
      return res.send("Error occured");
    }
    const mg = mailgun({
      apiKey: process.env.MAILGUN_APIKEY,
      domain: process.env.MAILGUN_DOMAIN,
    });
    const data = generateForgotPasswordEmail(emailExist.email, emailExist.name, token);
    console.log(data);
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
  console.log(resetLink);

  if(resetLink) {
    
    // Verifing the reset link
    try {
      await jwt.verify(resetLink, process.env.JWT_ACC_ACTIVATE);
    } catch (err) {
      console.log(err);
      return res.send("Incorrect or expired toekn");
    }

    // Finding the user
    const user = await User.findOne({ resetLink: resetLink });
    console.log(user);
    if(!user) return res.send("Bad token");

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

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

module.exports = router;
