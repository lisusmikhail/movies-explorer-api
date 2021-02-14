const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const { errorMessages } = require('../utils');
const { defaultName } = require('../utils');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, errorMessages.requireFieldError],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: errorMessages.emailInvalid,
    },
  },
  password: {
    type: String,
    required: [true, errorMessages.requireFieldError],
    select: false,
  },
  name: {
    type: String,
    required: false,
    minlength: [2, errorMessages.notEnoughData],
    maxlength: [30, errorMessages.tooMuchData],
    default: defaultName,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(errorMessages.credentialsError));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(errorMessages.credentialsError));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
