const mongoose = require('mongoose');
const { compare } = require('bcryptjs');

const { imageLink, emailLink } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => emailLink.test(email),
        message: 'Требуется ввести электронный адрес',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
      minlength: 2,
      maxlength: 30,
    },

    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },

    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },

    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => imageLink.test(url),
        message: 'Требуется ввести URL',
      },
    },
  },

  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this
          .findOne({ email })
          .select('+password')
          .then((user) => {
            if (user) {
              return compare(password, user.password)
                .then((matched) => {
                  if (matched) return user;

                  return Promise.reject();
                });
            }

            return Promise.reject();
          });
      },
    },
  },
);

module.exports = mongoose.model('User', userSchema);
