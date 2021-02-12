const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const errorMessages = require('../utils');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: errorMessages.emailInvalid,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Анонимный зритель',
  },
});

userSchema.statics.findUserByCredentials = (email, password) => this.findOne({ email }).select('+password')
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

module.exports = mongoose.model('user', userSchema);
