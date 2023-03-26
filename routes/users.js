const routerUsers = require('express').Router();
const { getUsers, getUserId, createUser } = require('../controllers/userControllers');

routerUsers.get('/', getUsers);
routerUsers.get('/:userId', getUserId);
routerUsers.post('/', createUser);

module.exports = routerUsers;
