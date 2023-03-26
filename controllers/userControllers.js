const User = require('../models/userScheam');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }));
};

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((userId) => {
      res.send({ data: userId });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }));
};

module.exports = { getUsers, getUserId, createUser };
