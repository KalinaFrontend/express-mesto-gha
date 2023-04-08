const router = require('express').Router();
const {
  getUsers, getUserId, patchProfile, patchAvatar, getUser,
} = require('../controllers/userControllers');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.get('/me', getUser);
router.patch('/me', patchProfile);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
