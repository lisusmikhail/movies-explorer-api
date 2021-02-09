const express = require('express');
require('dotenv').config();
const { celebrate, Joi, errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');
const auth = require('./middlewares/auth');
const {
  createUser, login,
} = require('./controllers/users');
const { NotFoundError } = require('./errors/NotFoundError');
// перенести адрес базы данных в конфиге
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(8).regex(/^\S*$/),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/(http|https):\/\/?[\w-._~:?#[\]@!$&'()*+,;=]+(?:\.[\w\-._~:?#[\]@!$&'()*+,;=]+)/),
    about: Joi.string().min(2).max(140),
  }),
}), createUser);

app.use(auth);

app.use('/users', usersRoute);

app.use('/cards', cardsRoute);

app.use('/', ((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
}));

app.use(errorLogger);
app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
});
