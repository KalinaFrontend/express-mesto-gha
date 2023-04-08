const router = require('express').Router();
const {
  getUsers, getUserId, createUser, patchProfile, patchAvatar,
} = require('../controllers/userControllers').default;

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.post('/', createUser);
router.patch('/me', patchProfile);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
