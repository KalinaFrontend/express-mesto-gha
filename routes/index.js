const router = require('express').Router();
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerCards = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/userControllers');

// роуты, не требующие авторизации
router.post('/signin', login);
router.post('/signup', createUser);
// роуты, которым авторизация нужна
router.use('/users', auth, routerUsers);
router.use('/cards', auth, routerCards);
router.use('*', auth, () => {
  throw new NotFoundError('Объект не найден');
});

module.exports = router;
