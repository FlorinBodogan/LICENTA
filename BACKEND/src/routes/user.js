const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/', auth, userController.fetchUserById);

router.get('/all', auth, userController.fetchAllUsers);

router.put('/update', auth, userController.updateUser);

router.post('/updateAdmin', auth, userController.updateUserByAdmin);

router.post('/banAdmin', auth, userController.banUserByAdmin);

router.post('/unbanAdmin', auth, userController.unBanUserByAdmin);

router.delete('/deleteAdmin', auth, userController.deleteUserByAdmin);

module.exports = router;