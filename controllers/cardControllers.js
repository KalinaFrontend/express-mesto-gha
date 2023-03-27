const Card = require('../models/cardScheam');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => res.send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        return res.status(NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      } return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      } return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

const putCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (!cards) {
        return res.status(NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      } return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

const deleteCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (!cards) {
        return res.status(NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
      } return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Ошибка работы сервера' });
    });
};

module.exports = {
  getCards, createCard, deleteCard, putCardLike, deleteCardLike,
};
