// validation
const Joi = require('@hapi/joi');

// register validation
export const registerValidtion = data => {
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
export const loginValidation = data => {
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