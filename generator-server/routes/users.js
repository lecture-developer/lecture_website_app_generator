const router = require('express').Router();
let User = require('../models/user.model');

// Get all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add user
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get user by id
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(username => res.json(username))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Delete user by id
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// Update user by id
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(username => {
        User.username = req.body.username;
  
        username.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });  

module.exports = router;