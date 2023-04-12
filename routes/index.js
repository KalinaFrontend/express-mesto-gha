const router = require('express').Router();
const routerUsers = require('./users');
const routerCards = require('./cards');
const NotFoundError = require('../middlewares/errors/notFoundError');

router.use('/users', routerUsers);
router.use('/cards', routerCards);
router.use('*', () => {
  throw new NotFoundError('Объект не найден');
});

module.exports = router;
