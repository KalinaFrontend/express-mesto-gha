const router = require('express').Router();
const routerUsers = require('./users');
const routerCards = require('./cards');
const NotFoundError = require('../middlewares/errors/notFoundError');
const auth = require('../middlewares/auth');

router.use('/users', auth, routerUsers);
router.use('/cards', routerCards);
router.use('*', () => {
  throw new NotFoundError('Объект не найден');
});

module.exports = router;
