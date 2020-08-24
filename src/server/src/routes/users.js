const router = require('express').Router();
const User = require('../models/user');
const {registerValidation, loginValidation} = require('../../validation');
const bcrypt = require('bcryptjs');

router.get('/users', async (req,res) => {
  console.log('trying to return users list');
  try{
    const res = User.find();
    res.json(users);
  } catch(err) {
    console.log("failed to return user list");
    res.status(400).send(err);
  }

})
// Add user
router.post('/register', async (req, res) => {
  console.log("trying to register: " + req.body);
  // Validate data
  //const { error } = registerValidation(req.body);
  //if(error) return res.status(400).send(error.details[0].message);

  // Checking if user is already in db
  //const emailExist = await User.findOne({email: req.body.email});
  //if(emailExist) return res.status(400).send('Email already exists');

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
  
  console.log("trying to login user: " +req.body);
  // Validate data
  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // Check if email address exists in db
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Email not found');

  //Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Incorrect password');

  res.send('Logged in!');
});

module.exports = router;