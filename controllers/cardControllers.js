const Card = require('../models/cardScheam');

const {
  CentralError,
  InaccurateDataError,
  NotFoundError,
} = require('../middlewares/errors/index');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => next(new CentralError('Внутренняя ошибка сервера')));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => res.status(201).send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InaccurateDataError('Переданы некорректные данные при создании карточки'));
      }
      next(new CentralError('Внутренняя ошибка сервера'));
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
      } return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Некоректный запрос к серверу'));
      } next(new CentralError('Внутренняя ошибка сервера'));
    });
};

const putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((cards) => {
      if (!cards) {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
      } return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Некоректный запрос к серверу'));
      }
      next(new CentralError('Внутренняя ошибка сервера'));
    });
};

const deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((cards) => {
      if (!cards) {
        next(new NotFoundError('Запрашиваемая карточка не найдена'));
      } return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Некоректный запрос к серверу'));
      }
      next(new CentralError('Внутренняя ошибка сервера'));
    });
};

module.exports = {
  getCards, createCard, deleteCard, putCardLike, deleteCardLike,
};
