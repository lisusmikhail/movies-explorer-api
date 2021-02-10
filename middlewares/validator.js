const { celebrate, Joi, errors } = require('celebrate');

const authDataValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(8).regex(/^\S*$/),
    name: Joi.string().min(2).max(30),
  }),
})

const userDataValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().lowercase(),
    name: Joi.string().min(2).max(30),
  }),
})

const signUpValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(8).regex(/^\S*$/),
    name: Joi.string().min(2).max(30),
  }),
})

const signInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(8),
  }),
})

const getUserInfoValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^Bearer +/),
  }).unknown(true),
})


const editUserInfoValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^Bearer +/),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email().lowercase(),
  })
})

module.exports = {signUpValidator, signInValidator, getUserInfoValidator, editUserInfoValidator, userDataValidator, authDataValidator}
