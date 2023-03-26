const Card = require('../models/cardScheam');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => res.send({ data: newCard }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        return res.status(404).send({ message: 'Объект не найден' });
      } return res.send({ data: cards });
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
        return res.status(404).send({ message: 'Объект не найден' });
      } return res.send({ data: cards });
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
        return res.status(404).send({ message: 'Объект не найден' });
      } return res.send({ data: cards });
    });
};

module.exports = {
  getCards, createCard, deleteCard, putCardLike, deleteCardLike,
};
