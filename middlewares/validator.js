const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const { NotFoundError } = require('../errors/NotFoundError');
const { errorMessages } = require('../config');

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

const objectIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom(((value) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      throw new NotFoundError(errorMessages.notFoundError);
    })),
  }),
});

module.exports = { userDataValidator, authDataValidator, objectIdValidator };
