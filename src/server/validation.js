// validation
const Joi = require('@hapi/joi');

// register validation
const registerValidtion = data => {
    const schema = {
        name: Joi.string()
          .min(6)
          .required(),
        email: Joi.string()
          .min(6)
          .required()
          .email(),
        password: Joi.string()
          .min(6)
          .required()
      };
      return Joi.validate(data, schema);
};

// login validation
const loginValidation = data => {
    const schema = {
        email: Joi.string()
          .min(6)
          .required()
          .email(),
        password: Joi.string()
          .min(6)
          .required()
      };
      return Joi.validate(data, schema);
};

module.exports.registerValidtion = registerValidtion;
module.exports.loginValidation = loginValidation;