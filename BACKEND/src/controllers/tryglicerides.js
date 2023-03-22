const { validationResult } = require('express-validator');
const Tryglicerides = require('../models/tryglicerides');
const jwt = require('jsonwebtoken');

exports.postInfoForTR = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const colesterol = req.body.colesterol;
    const hdl = req.body.hdl;
    const ldl = req.body.ldl;
    const user = req.body.user;

    //Tryglicerides
    try {
        const trygliceridesDetails = {
            colesterol: colesterol,
            hdl: hdl,
            ldl: ldl,
            user: user
        };

        const resultTR = await Tryglicerides.calculateTryglicerides(trygliceridesDetails);

        const result = await Tryglicerides.saveTRResult({
            resultTR: resultTR,
            colesterol: trygliceridesDetails.colesterol,
            hdl: trygliceridesDetails.hdl,
            ldl: trygliceridesDetails.ldl,
            user: user
        });

        res.status(201).json({
            message: 'Calculul TR a fost efectuat',
            resultAT: resultTR
        });
    } catch (e) {
        res.status(e.statusCode || 500).json({ message: e.message });
    }
};

exports.fetchTRResultById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [tr] = await Tryglicerides.fetchTRResultById(decodedToken.userId);
        res.status(200).json(tr);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchAllTRResultById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [tr] = await Tryglicerides.fetchAllTRResultById(decodedToken.userId);
        res.status(200).json(tr);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchAllTRDateById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [tr] = await Tryglicerides.fetchAllTRDateById(decodedToken.userId);
        res.status(200).json(tr);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchTRResultForAll = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [result] = await Tryglicerides.fetchTRResultForAll(decodedToken.userId);
        res.status(200).json(result);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.getTRCounts = async (req, res, next) => {
    try {
      const countPromises = [];
      countPromises.push(Tryglicerides.getCountForTR('Normal'));
      countPromises.push(Tryglicerides.getCountForTR('Limita Normalului'));
      countPromises.push(Tryglicerides.getCountForTR('Ridicat'));
      countPromises.push(Tryglicerides.getCountForTR('Foarte Ridicat'));
  
      const counts = await Promise.all(countPromises);
  
      res.json({ counts });
    } catch (error) {
      next(error);
    }
};