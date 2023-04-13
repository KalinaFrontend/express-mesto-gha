const Card = require('../models/cardScheam');

const {
  ForbiddenError,
  InaccurateDataError,
  NotFoundError,
} = require('../middlewares/errors/index');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { userId } = req.user;
  Card.create({ name, link, owner: userId })
    .then((newCard) => res.status(201).send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InaccurateDataError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card.findById({ _id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }

      const { owner: cardOwnerId } = card;
      if (cardOwnerId.valueOf() !== userId) {
        throw new ForbiddenError('Нет прав доступа');
      }
      card
        .remove()
        .then(() => res.send({ data: card }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Некоректный запрос к серверу'));
      } else {
        next(err);
      }
    });
};

const putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.userId } },
    { new: true },
  )
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      } return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Некоректный запрос к серверу'));
      } else {
        next(err);
      }
    });
};

const deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.userId } },
    { new: true },
  )
    .populate('likes')
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      } return res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Некоректный запрос к серверу'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, putCardLike, deleteCardLike,
};
