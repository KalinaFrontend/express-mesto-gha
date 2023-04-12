const mongoose = require('mongoose');
const { imageLink } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      minlength: 2,
      maxlength: 30,
      message: 'Имя карточки должно быть длиной от 2 до 30 символов',
    },
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => imageLink.test(url),
      message: 'Требуется ввести URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
