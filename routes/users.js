const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { isUrl } = require('../utils/constants');

const {
  getUsers,
  getUser,
  getUserId,
  patchProfile,
  patchAvatar,
} = require('../controllers/userControllers');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserId);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(isUrl),
  }),
}), patchAvatar);

module.exports = router;
