const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 140,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'This field must be a valid URL',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'This field must be a valid URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'This field must be a valid URL',
    },
  },
});

//
//
//
//   thumbnail: {
//     type: String,
//     required: true,
//     validate: {
//     validator: (v) => validator.isURL(v),
//       message: 'This field must be a valid URL'
//   },
//     },
//   },
//   owner: [{ type: 'ObjectId', default: '' }],
//   createdAt: { type: Date, default: Date.now },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     required: true,
//   },
// });

module.exports = mongoose.model('card', cardSchema);
