const express = require('express');
require('dotenv').config();
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_DEV_URL } = require('./config');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000, MONGO_URL = MONGO_DEV_URL } = process.env;

const app = express();
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
// helmet
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
});
