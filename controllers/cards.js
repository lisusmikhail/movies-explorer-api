const Card = require('../models/card');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const {errorMessages} = require('../config')

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).sort({ _id: -1 });
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const id = req.user._id;
  try {
    const card = await Card.create({ name, link, owner: id })
      .catch(() => {
        throw new BadRequestError(errorMessages.validationError);
      });
    res.send({ data: card });
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const cardToDelete = await Card.findById(id);
    if (cardToDelete.owner.toString() === userId.toString()) {
      const deletedCard = await Card.findByIdAndRemove({ _id: id })
        .catch(() => {
          throw new BadRequestError('Неправильный формат данных');
        });
      if (!deletedCard) {
        throw new NotFoundError(`Нет карточки с таким id = ${id}`);
      } else {
        res.send(deletedCard);
      }
    } else {
      throw new ForbiddenError('Нет прав на эту операцию');
    }
  } catch (err) {
    next(err);
  }
};

const addLike = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const likedCard = await Card.findByIdAndUpdate(
      id, { $addToSet: { likes: userId } }, { new: true },
    ).catch(() => {
      throw new BadRequestError('Неправильный формат данных');
    });
    if (!likedCard) {
      throw new NotFoundError(`Нет карточки с таким id = ${id}`);
    } else {
      res.status(200).send(likedCard);
    }
  } catch (err) {
    next(err);
  }
};

const deleteLike = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const dislikedCard = await Card.findByIdAndUpdate(
      id, { $pull: { likes: userId } }, { new: true },
    ).catch(() => {
      throw new BadRequestError('Неправильный формат данных');
    });
    if (!dislikedCard) {
      throw new NotFoundError(`Нет карточки с таким id = ${id}`);
    } else {
      res.status(200).send(dislikedCard);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCards, createCard, deleteCard, addLike, deleteLike,
};
