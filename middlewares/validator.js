const { celebrate, Joi } = require('celebrate');

const authDataValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const userDataValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().lowercase(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = { userDataValidator, authDataValidator };
