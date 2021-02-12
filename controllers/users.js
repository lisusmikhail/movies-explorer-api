const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { AuthenticationError } = require('../errors/AuthenticationError');
const { ConflictError } = require('../errors/ConflictError');
const { JWT_SECRET } = require('../config');
const errorMessages = require('../utils');

const getCurrentUser = async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findOne({ _id: id })
      .catch(() => { throw new BadRequestError(errorMessages.dataError); });
    if (!user) {
      throw new NotFoundError(errorMessages.notFoundError);
    } else {
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: hash, name,
    })
      .catch((err) => {
        if (Object.keys(err).some((value) => value === 'keyPattern')) {
          if (Object.keys(err.keyPattern)[0] === 'email') {
            throw new ConflictError(errorMessages.emailError);
          }
        }
        throw new BadRequestError(errorMessages.dataError);
      });
    res.status(201).send({
      data: {
        email, name, _id: user._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

const editUserInfo = async (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;
  try {
    if (name && email) {
      const userInfo = await User.findByIdAndUpdate(id, { name, email },
        { new: true, runValidators: true })
        .catch(() => { throw new BadRequestError(errorMessages.dataError); });
      res.send({ data: userInfo });
    } else {
      throw new BadRequestError(errorMessages.dataError);
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password)
      .catch((err) => { throw new AuthenticationError(err.message); });

    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET, { expiresIn: '7d' },
    );

    res.send({
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser, editUserInfo, login, getCurrentUser,
};
