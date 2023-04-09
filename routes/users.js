const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserId,
  patchProfile,
  patchAvatar,
} = require('../controllers/userControllers');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', getUserId);
router.patch('/me', patchProfile);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
