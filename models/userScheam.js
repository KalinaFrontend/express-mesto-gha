const mongoose = require('mongoose');
const { compare } = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { regexImageLink } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Жак-Ив Кусто',
    validate: {
      validator: ({ length }) => length >= 2 && length <= 30,
      message: 'Имя пользователя должно быть длиной от 2 до 30 символов',
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (avatar) => regexImageLink.test(avatar),
      message: 'Неверный формат ссылки аватара',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Неверный формат аватара email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль.'));
      }

      return compare(password, user.password).then((matched) => {
        // проверяем хеши паролей]
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль.'));
        }

        return user;
      });
    });
};

module.exports = mongoose.model('User', userSchema);
