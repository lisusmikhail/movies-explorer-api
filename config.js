require('dotenv').config();

const { JWT_SECRET = 'dev-secret' } = process.env;
const MONGO_DEV_URL = 'mongodb://127.0.0.1:27017/moviesexplorerdb';

module.exports = {
  MONGO_DEV_URL, JWT_SECRET,
};
