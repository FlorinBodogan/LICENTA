const User = require('../models/user');
const jwt = require('jsonwebtoken');

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
} 

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
}

exports.updateUser = async(req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const userDetails = {
            name: name,
            email: email,
            password: password
        }

        const update = await User.updateUser(userDetails);

        res.status(201).json({
            message: 'Utilizatorul a fost modificat'
        })
    } catch(e) {
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }
}