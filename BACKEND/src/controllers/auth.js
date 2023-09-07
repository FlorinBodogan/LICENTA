const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(201).json({
        message: 'Există deja un cont cu acest nume sau email.'
      });
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = 'user';
    const status = 'activ';

    try{
        const hashPassword = await bcrypt.hash(password, 11);

        const userDetails = {
            name: name,
            email: email,
            password: hashPassword,
            role: role,
            status: status
        };

        const result = await User.save(userDetails);

        res.status(201).json({
            message: 'Contul a fost creat cu succes!'
        });
    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }
};

exports.login = async (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    try {
      const user = await User.findUser(name);
      const retainedUser = user[0][0];
  
      if (user[0].length !== 1) {
        const error = new Error('Un utilizator cu acest nume nu a fost gasit');
        error.statusCode = 401;
        throw error;
      }
  
      const isEqual = await bcrypt.compare(password, retainedUser.password);
  
      if (!isEqual) {
        const error = new Error('Parola este gresita');
        error.statusCode = 401;
        throw error;
      }
  
      const jsontoken = jwt.sign(
        {
          name: retainedUser.name,
          userId: retainedUser.id,
          role: retainedUser.role,
          status: retainedUser.status
        },
        'secretWebToken',
        { expiresIn: '14d' }
      );
      res.status(200).json({ token: jsontoken, userId: retainedUser.id, name:retainedUser.name });
    } catch (e) {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    }
};