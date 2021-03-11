const mongoose = require('mongoose');
const validator = require('validator');
const { errorMessages } = require('../utils');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, errorMessages.requireFieldError],
    minlength: [2, errorMessages.notEnoughData],
    maxlength: [250, errorMessages.tooMuchData],
  },
  director: {
    type: String,
    required: [true, errorMessages.requireFieldError],
    minlength: [2, errorMessages.notEnoughData],
    maxlength: [250, errorMessages.tooMuchData],
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: [true, errorMessages.requireFieldError],
    minlength: [4, errorMessages.notEnoughData],
    maxlength: [50, errorMessages.tooMuchData],
  },
  description: {
    type: String,
    required: [true, errorMessages.requireFieldError],
    minlength: [2, errorMessages.notEnoughData],
    maxlength: [5200, errorMessages.tooMuchData],
  },
  image: {
    type: String,
    required: [true, errorMessages.requireFieldError],
    validate: {
      validator: (v) => validator.isURL(v),
      message: errorMessages.urlInvalid,
    },
  },
  trailer: {
    type: String,
    required: [true, errorMessages.requireFieldError],
    validate: {
      validator: (v) => validator.isURL(v),
      message: errorMessages.urlInvalid,
    },
  },
  thumbnail: {
    type: String,
    required: [true, errorMessages.requireFieldError],
    validate: {
      validator: (v) => validator.isURL(v),
      message: errorMessages.urlInvalid,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, errorMessages.requireFieldError],
  },
  movieId: {
    type: Number,
    required: [true, errorMessages.requireFieldError],
  },
  nameRU: {
    type: String,
    required: [true, errorMessages.requireFieldError],
    maxlength: [520, errorMessages.tooMuchData],
  },
  nameEN: {
    type: String,
    required: [true, errorMessages.requireFieldError],
    maxlength: [520, errorMessages.tooMuchData],
  },
});

module.exports = mongoose.model('movie', movieSchema);
