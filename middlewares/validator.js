const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;
const errorMessages = require('../utils');

const authDataValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(errorMessages.emailInvalid)
      .messages({
        'string.empty': errorMessages.emptyFieldError,
        'any.required': errorMessages.requireFieldError,
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': errorMessages.emptyFieldError,
        'string.min': errorMessages.passwordError,
        'any.required': errorMessages.requireFieldError,
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.empty': errorMessages.emptyFieldError,
        'string.min': errorMessages.notEnoughData,
        'string.max': errorMessages.tooMuchData,
      }),
  }),
});

const userDataValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(errorMessages.emailInvalid)
      .messages({
        'string.empty': errorMessages.emptyFieldError,
        'any.required': errorMessages.requireFieldError,
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': errorMessages.emptyFieldError,
        'any.required': errorMessages.requireFieldError,
        'string.min': errorMessages.notEnoughData,
        'string.max': errorMessages.tooMuchData,
      }),
  }),
});

const deleteMovieValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^Bearer +/),
  }).unknown(true),
  params: Joi.object().keys({
    id: Joi.string().required().custom(((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message(errorMessages.idIsNotValid);
    })),
  }),
});

const getMoviesValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^Bearer +/),
  }).unknown(true),
});

const createMovieValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^Bearer +/),
  }).unknown(true),
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(50)
      .messages({ string: 'slkdjgsldkjgklgjkl' }),
    director: Joi.string().required().min(2).max(50),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(10),
    description: Joi.string().required().min(2),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(errorMessages.urlInvalid);
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(errorMessages.urlInvalid);
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(errorMessages.urlInvalid);
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  userDataValidator,
  authDataValidator,
  deleteMovieValidator,
  getMoviesValidator,
  createMovieValidator,
};
