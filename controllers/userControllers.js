const User = require('../models/userScheam');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((userId) => {
      if (!userId) {
        return res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      } return res.send({ data: userId });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      } return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

const patchProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

const patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((updatedAvatar) => res.send({ data: updatedAvatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Ошибка обработки данных' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

module.exports = {
  getUsers, getUserId, createUser, patchProfile, patchAvatar,
};
