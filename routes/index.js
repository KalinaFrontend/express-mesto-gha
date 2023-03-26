const router = require('express').Router();
const userScheam = require('../models/userScheam');
const userRoutes = require('./users');

router.use('/users', userRoutes);
