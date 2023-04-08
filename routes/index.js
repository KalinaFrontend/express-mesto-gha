const router = require('express').Router();
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerCards = require('./cards');
const { NOT_FOUND } = require('../utils/constants');
const { createUser, login } = require('../controllers/userControllers');

// роуты, не требующие авторизации
router.post('/signin', login);
router.post('/signup', createUser);
// роуты, которым авторизация нужна
router.use('/users', auth, routerUsers);
router.use('/cards', auth, routerCards);
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Объект не найден' });
});

module.exports = router;
