const router = require('express').Router();
const {
  getUsers, getUserId, patchProfile, patchAvatar,
} = require('../controllers/userControllers');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.patch('/me', patchProfile);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
