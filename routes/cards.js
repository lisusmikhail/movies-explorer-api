const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^Bearer +/),
  }).unknown(true),
}), getCards);

router.post('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^Bearer +/),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().regex(/(http|https):\/\/?[\w-._~:?#[\]@!$&'()*+,;=]+(?:\.[\w\-._~:?#[\]@!$&'()*+,;=]+)/),
  }),
}), createCard);

router.delete('/:id', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^Bearer +/),
  }).unknown(true),
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deleteCard);

router.put('/:id/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^Bearer +/),
  }).unknown(true),
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), addLike);

router.delete('/:id/likes', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().regex(/^Bearer +/),
  }).unknown(true),
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deleteLike);

module.exports = router;
