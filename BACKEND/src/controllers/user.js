const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.getUser = async(req, res, next) => {
    try {
        const user = await User.findUser();
        res.status(200).json(user);
    } catch(e) {
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }
};

exports.fetchAllUsers = async (req, res, next) => {
  try {
    let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
    const users = await User.getAllUsers();
    res.status(200).json(users);

  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.fetchUserById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [currentUser] = await User.fetchUserById(decodedToken);
        res.status(200).json(currentUser);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }
};

exports.updateUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, 'secretWebToken');
  const userId = decodedToken.userId;

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashedPassword = await bcrypt.hash(password, 11);

    const userDetails = {
      name: name,
      email: email,
      password: hashedPassword
    }

    const update = await User.updateUser(userId, userDetails);

    res.status(201).json({
      message: 'Utilizatorul a fost modificat'
    })
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};


exports.updateUserByAdmin = async (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

  const name = req.body.name;
  const email = req.body.email;
  const userName = req.body.userName;

  try {
    console.log(req.body.name, req.body.email, req.body.userName)
    console.log(name, email, userName);

    const userDetails = {
      name: name,
      email: email,
      userName: userName
    }

    const update = await User.updateUserByAdmin(userDetails);

    res.status(201).json({
      message: 'Utilizatorul a fost modificat'
    })
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.banUserByAdmin = async (req, res, next) => {
  const userName = req.body.userName;

  try {
    await User.banUser(userName);

    res.status(200).json({
      message: 'Utilizatorul a fost banat cu succes'
    });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.unBanUserByAdmin = async (req, res, next) => {
  const userName = req.body.userName;

  try {
    const result = await User.unBanUser(userName);

    res.status(200).json({
      message: 'Utilizatorul a fost debanat cu succes'
    });
  } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};

exports.deleteUserByAdmin = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, 'secretWebToken');

  const userName = req.body.userName;

  try {
    const result = await User.deleteUserByAdmin(userName);

    return res.status(200).json({
        message: 'Utilizatorul a fost șters cu succes'
    });
    } catch (e) {
    if (!e.statusCode) {
      e.statusCode = 500;
    }
    next(e);
  }
};
