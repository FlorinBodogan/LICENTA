const { validationResult } = require('express-validator');
const Colesterol = require('../models/colesterol');
const jwt = require('jsonwebtoken');

exports.postInfoForCOL = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const hdl = req.body.hdl;
    const ldl = req.body.ldl;
    const triglycerides = req.body.triglycerides;
    const user = req.body.user;

    //Colesterol
    try {
        const colesterolDetails = {
            hdl: hdl,
            ldl: ldl,
            triglycerides: triglycerides,
            user: user
        };

        const resultCOL = await Colesterol.calculateColesterol(colesterolDetails);

        const result = await Colesterol.saveCOLResult({
            resultCOL: resultCOL,
            hdl: colesterolDetails.hdl,
            ldl: colesterolDetails.ldl,
            triglycerides: colesterolDetails.triglycerides,
            user: user
        });

        res.status(201).json({
            message: 'Calculul COL a fost efectuat',
            resultCOL: resultCOL
        });
    } catch (e) {
        res.status(e.statusCode || 500).json({ message: e.message });
    }
};

exports.fetchCOLResultForAll = async(req, res, next) => {
    //STATISTICA COLESTEROL
    try {
        const [result] = await Colesterol.fetchCOLResultForAll();
        res.status(200).json(result);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchCOLResultById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [col] = await Colesterol.fetchCOLResultById(decodedToken.userId);
        res.status(200).json(col);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchAllCOLResultById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [col] = await  Colesterol.fetchAllCOLResultById(decodedToken.userId);
        res.status(200).json(col);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchAllCOLDateById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [col] = await Colesterol.fetchAllCOLDateById(decodedToken.userId);
        res.status(200).json(col);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchCOLById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [result] = await Colesterol.fetchCOLById(decodedToken.userId);
        res.status(200).json(result);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.getCOLCounts = async (req, res, next) => {
    try {
      const countPromises = [];
      countPromises.push(Colesterol.getCountForCOL('Normal'));
      countPromises.push(Colesterol.getCountForCOL('Limita Normalului'));
      countPromises.push(Colesterol.getCountForCOL('Ridicat'));
  
      const counts = await Promise.all(countPromises);
  
      res.json({ counts });
    } catch (error) {
      next(error);
    }
};