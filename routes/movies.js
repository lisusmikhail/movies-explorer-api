const router = require('express').Router();
// const { userDataValidator, authDataValidator, objectIdValidator } = require('../middlewares/validator');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:id', deleteMovie);
// router.delete('/:id', objectIdValidator, deleteMovie);

module.exports = router;
