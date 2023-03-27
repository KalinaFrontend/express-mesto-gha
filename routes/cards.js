const routerCards = require('express').Router();
const {
  getCards, createCard, deleteCard, putCardLike, deleteCardLike,
} = require('../controllers/cardControllers');

routerCards.get('/', getCards);
routerCards.post('/', createCard);
routerCards.delete('/:cardId', deleteCard);
routerCards.put('/:cardId/likes', putCardLike);
routerCards.delete('/:cardId/likes', deleteCardLike);

module.exports = routerCards;
