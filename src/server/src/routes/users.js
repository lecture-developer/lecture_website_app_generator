const router = require('express').Router();
const User = require('../models/user');
const {registerValidation, loginValidation} = require('../../validation');
const bcrypt = require('bcryptjs');
const { valid } = require('@hapi/joi');

// Add user
router.post('/register', async (req, res) => {
  console.log("trying to register user: ");
  console.log("name: " + req.body.name);
  console.log("email: " + req.body.email);
  // Validate data
  //const { error } = registerValidation(req.body);
  //if(error) return res.status(400).send(error.details[0].message);

  // Checking if user is already in db
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists');

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const newUser = new User({
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email
  });
  
  try {
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch(err) {
    console.log("failed to save user");
    console.log(err);
    res.status(400).send(err);
  }
});

router.post('/login', async (req,res) => {
  
  console.log("trying to login user: " + req.body.email);

  // Validate data
  //const {error} = loginValidation(req.body);
  //if(error) return res.status(400).send(error.details[0].message);

  // Check if email address exists in db
  try{
    const user = await User.findOne({email: req.body.email});
    console.log("According to the email, found user: " + user);
    if (!user) return res.status(400).send('Email not found');
    console.log("passed search in db...");
    // Check if password is correct
    try {
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if(!validPassword) return res.status(400).send('Incorrect password');
      console.log("passed password validation...");
    } catch(err) {
      console.log("failed to validate user password during the login process");
      console.log(err);
      res.status(400).send(err);
    }
  } catch(err) {
    console.log("failed to find user during the login process");
    console.log(err);
    res.status(400).send(err);
  }
  console.log("login process completed");
  res.send('Logged in!');
  console.log("logged in");
});

module.exports = router;