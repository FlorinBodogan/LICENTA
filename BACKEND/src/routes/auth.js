const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/auth');

router.post(
    '/register',
    [
        body('name').trim().not().isEmpty().custom(async(name) => {
            const user = await User.findUser(name);
            if(user[0].length > 0){
                return Promise.reject('Numele exista deja');
            }
        }),
        body('email').isEmail().withMessage("Introdu un email valid")
        .custom(async(email) => {
            const user = await User.findEmail(email);
            if(user[0].length > 0){
                return Promise.reject('Emailul exista deja');
            }
        })
        .normalizeEmail(), 
        body('password').trim().isLength({min: 6})
    ], authController.register
);

router.post('/login', authController.login);

module.exports = router;