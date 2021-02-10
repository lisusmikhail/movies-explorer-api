const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { AuthenticationError } = require('../errors/AuthenticationError');

const getCurrentUser = async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findOne({ _id: id })
      .catch(() => { throw new BadRequestError('Неправильный формат данных'); });
    if (!user) {
      throw new NotFoundError(`Нет пользователя с таким id ${id}`);
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
            throw new BadRequestError('Пользователь с таким email уже зарегистрирован');
          }
        }
        throw new BadRequestError('Ошибка валидации');
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
        .catch(() => { throw new BadRequestError('Ошибка в данных или валидации'); });
      res.send({ data: userInfo });
    } else {
      throw new BadRequestError('Недостаточно данных');
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  try {
    const user = await User.findUserByCredentials(email, password)
      .catch((err) => { throw new AuthenticationError(err.message); });

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
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
