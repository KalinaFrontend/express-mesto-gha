const routerUsers = require('express').Router();
const {
  getUsers, getUserId, createUser, patchProfile, patchAvatar,
} = require('../controllers/userControllers');

routerUsers.get('/', getUsers);
routerUsers.get('/:userId', getUserId);
routerUsers.post('/', createUser);
routerUsers.patch('/me', patchProfile);
routerUsers.patch('/me/avatar', patchAvatar);

module.exports = routerUsers;
