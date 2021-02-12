const Movie = require('../models/movie');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { errorMessages } = require('../config');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id }).sort({ _id: -1 });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  const id = req.user._id;
  const {
    movieId,
    nameRU,
    nameEN,
    director,
    country,
    year,
    duration,
    description,
    trailer,
    thumbnail,
    image,
  } = req.body;
  try {
    const movie = await Movie.create({
      movieId,
      nameRU,
      nameEN,
      director,
      country,
      year,
      duration,
      description,
      trailer,
      thumbnail,
      image,
      owner: id,
    })
      .catch(() => {
        throw new BadRequestError(errorMessages.dataError);
      });
    res.send({ data: movie });
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const movieToDelete = await Movie.findById(id)
      .catch(() => {
        throw new BadRequestError(errorMessages.dataError);
      });
    if (!movieToDelete) {
      throw new NotFoundError(errorMessages.notFoundError);
    }
    if (movieToDelete.owner.toString() === userId.toString()) {
      const deletedMovie = await Movie.findByIdAndRemove({ _id: id });
      res.send(deletedMovie);
    } else {
      throw new ForbiddenError(errorMessages.forbiddenError);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
