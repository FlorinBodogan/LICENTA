const Triglycerides = require('../models/tryglicerides');
const ArterialTension = require('../models/arterialtension');
const Colesterol = require('../models/colesterol');
const UserInfo = require('../models/userinfo');
const jwt = require('jsonwebtoken');

exports.fetchRmbAllResultWithParamsById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [rmb] = await UserInfo.fetchRmbAllResultWithParamsById(decodedToken.userId);
        res.status(200).json(rmb);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.fetchBmiAllResultWithParamsById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [bmi] = await UserInfo.fetchBmiAllResultWithParamsById(decodedToken.userId);
        res.status(200).json(bmi);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.fetchAllTRResultWithParamsById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [tr] = await Triglycerides.fetchAllTRResultWithParamsById(decodedToken.userId);
        res.status(200).json(tr);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchAllATResultWithParamsById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [at] = await ArterialTension.fetchAllATResultWithParamsById(decodedToken.userId);
        res.status(200).json(at);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchAllCOLResultWithParamsById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [col] = await  Colesterol.fetchAllCOLResultWithParamsById(decodedToken.userId);
        res.status(200).json(col);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};