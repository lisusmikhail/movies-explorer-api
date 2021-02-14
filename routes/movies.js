const router = require('express').Router();
const {
  deleteMovieValidator, getMoviesValidator, createMovieValidator,
} = require('../middlewares/validator');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMoviesValidator, getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:id', deleteMovieValidator, deleteMovie);

module.exports = router;
