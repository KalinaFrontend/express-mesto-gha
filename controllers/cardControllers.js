const Card = require('../models/cardScheam');

const {
  CentralError,
  ForbiddenError,
  InaccurateDataError,
  NotFoundError,
} = require('../middlewares/errors/index');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(() => next(new CentralError('Внутренняя ошибка сервера')));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { userId } = req.user;
  Card.create({ name, link, owner: userId })
    .then((newCard) => res.status(201).send({ data: newCard }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InaccurateDataError('Переданы некорректные данные при создании карточки'));
      }
      next(new CentralError('Внутренняя ошибка сервера'));
    });
};

const deleteCard = (req, res, next) => {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card.findById({ _id: cardId })
    .then((card) => {
      if (!card) {
        throw next(new NotFoundError('Запрашиваемая карточка не найдена'));
      }

      const { owner: cardOwnerId } = card;
      if (cardOwnerId.valueOf() !== userId) {
        throw next(new ForbiddenError('Нет прав доступа'));
      }

      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((deletedCard) => res.send(deletedCard))
    .catch(() => next(new CentralError('Внутренняя ошибка сервера')));
};

const putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.userId } },
    { new: true },
  )
    .then((cards) => {
      if (!cards) {
        throw next(new NotFoundError('Запрашиваемая карточка не найдена'));
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
    { $pull: { likes: req.user.userId } },
    { new: true },
  )
    .populate('likes')
    .then((cards) => {
      if (!cards) {
        throw next(new NotFoundError('Запрашиваемая карточка не найдена'));
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
