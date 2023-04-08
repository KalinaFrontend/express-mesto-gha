const router = require('express').Router();
const routerUsers = require('./users');
const routerCards = require('./cards');
const { NOT_FOUND } = require('../utils/constants');
const { createUser, login } = require('../controllers/userControllers');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', routerUsers);
router.use('/cards', routerCards);
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Объект не найден' });
});

module.exports = router;
