const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { regexImageLink } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
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
module.exports = mongoose.model('User', userSchema);
