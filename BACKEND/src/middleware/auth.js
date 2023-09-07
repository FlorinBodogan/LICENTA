const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    const authToken = req.get('Authorization');
    if(!authToken) {
        const error = new Error('Lipseste Tokenul');
        error.statusCode = 401;
        throw error;
    }

    // 'Bearer dawodnawoidbawodb'
    const token = authToken.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secretWebToken');
    } catch(e) {
        e.statusCode = 500;
        throw e;
    }

    if(!decodedToken){
        const error = new Error('Utilizatorul nu este logat in cont');
        error.statusCode = 401;
        throw error;
    }

    req.isUserLogged = true;
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    req.role = decodedToken.role;
    next();
};

