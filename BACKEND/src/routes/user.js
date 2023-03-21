const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/', auth, userController.fetchUserById);

router.put('/', userController.updateUser);

module.exports = router;