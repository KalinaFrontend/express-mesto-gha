const router = require('express').Router();
const { getUsers, getUserId, createUser } = require('../controllers/userControllers');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.post('/', createUser);

module.exports = router;
