const Images = require('../models/images');
const { validationResult } = require('express-validator');
const multer = require('multer');
const jwt = require('jsonwebtoken');

exports.uploadImage = async(req, res, next) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) return 


    const image = req.body.filename;
    const user = req.body.user;
    const profile_url = `http://localhost:3500/image/${image}`;
    
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const imageDetails = {
            image: profile_url,
            user: user
        }
        
        const result = await Images.saveImage(imageDetails);
        console.log(imageDetails);
        
        res.json({
            succes: "Incarcarea a reusit",
            profile_url: `http://localhost:3500/image/${image}`
        });
    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }
};

exports.fetchById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [userImage] = await Images.fetchById(decodedToken);
        res.status(200).json(userImage);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }
}