const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userScheam');
const { JWT_SECRET } = require('../utils/constants');

const {
  CentralError,
  ConflictError,

  InaccurateDataError,
  NotFoundError,
  UnauthorizedError,
} = require('../middlewares/errors/index');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  hash(password, 10)
    .then((hashedPassword) => User.create({
      email,
      password: hashedPassword,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(201).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким электронным адресом уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new InaccurateDataError('Переданы некорректные данные при регистрации пользователя1'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign(
          { userId },
          JWT_SECRET,
          { expiresIn: '7d' },
        );

        return res.send({ _id: token });
      }

      throw new UnauthorizedError('Неправильные почта или пароль');
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => next(new CentralError('Внутренняя ошибка сервера')));
};

const getUser = (req, res, next) => {
  const { userId } = req.user;
  User
    .findById(userId)
    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

const getUserId = (req, res, next) => {
  const { id } = req.params;

  User
    .findById(id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        return res.send({ user });
      }
      next(new NotFoundError('Запрашиваемый пользователь не найден'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InaccurateDataError('Передан некорректный id'));
      } next(new CentralError('Внутренняя ошибка сервера'));
    });
};

const patchProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { userId } = req.user;

  User
    .findByIdAndUpdate(
      userId,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) return res.send({ user });
      next(new NotFoundError('Запрашиваемый пользователь не найден'));
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new InaccurateDataError('Ошибка обработки данных'));
      } else {
        next(new CentralError('Внутренняя ошибка сервера'));
      }
    });
};

const patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((updatedAvatar) => res.send({ data: updatedAvatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InaccurateDataError('Ошибка обработки данных'));
      }
      next(new CentralError('Внутренняя ошибка сервера'));
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUser,
  getUserId,
  patchProfile,
  patchAvatar,
};
