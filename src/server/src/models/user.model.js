const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  // TODO: hash and encrypt password, checkout (https://www.npmjs.com/package/bcrypt) | (https://blog.cloudboost.io/bcrypt-and-nodejs-e00a0d1df91f)
  password: {
    type: String,
    required: true,
    unique: false,
    minlength: 8
    trim: true,
  },
   this.name = name;
    this.email = email;
    this.phone = phone;
    this.position = position;
    this.researchField = researchField;
    this.officeAddress = officeAddress;
    this.links = links;
 name: String,
 email: String,
 phone: String,
 position: [String],
 researchField: [String],
 officeAddress: [String],
 photo_link: String,
 photo_link: String,
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;