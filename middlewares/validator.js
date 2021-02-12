const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;
const errorMessages = require('../utils');

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

const deleteMovieValidator = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^Bearer +/),
  }).unknown(true),
  params: Joi.object().keys({
    id: Joi.string().required().custom(((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Не валидный ID');
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
    country: Joi.string().required().min(2).max(50),
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
