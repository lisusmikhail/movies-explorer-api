require('dotenv').config();

const { JWT_SECRET = 'dev-secret' } = process.env;
const MONGO_DEV_URL = 'mongodb://127.0.0.1:27017/moviesexplorerdb';
const errorMessages = {
  authError: 'Ошибка авторизации',
  passwordError: 'Поле "password" должно содержать не менее 8 символов',
  serverError: 'На сервере произошла ошибка',
  notFoundError: 'Запрашиваемый ресурс не найден',
  dataError: 'Ошибка в данных или валидации',
  emailError: 'Пользователь с таким email уже зарегистрирован',

};

module.exports = { MONGO_DEV_URL, JWT_SECRET, errorMessages };
