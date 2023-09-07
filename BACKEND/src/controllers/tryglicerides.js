const { validationResult } = require('express-validator');
const Triglycerides = require('../models/tryglicerides');
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

    //Triglycerides
    try {
        const triglyceridesDetails = {
            colesterol: colesterol,
            hdl: hdl,
            ldl: ldl,
            user: user
        };

        const resultTR = await Triglycerides.calculateTryglicerides(triglyceridesDetails);

        const result = await Triglycerides.saveTRResult({
            resultTR: resultTR,
            colesterol: triglyceridesDetails.colesterol,
            hdl: triglyceridesDetails.hdl,
            ldl: triglyceridesDetails.ldl,
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

exports.fetchTRResultForAll = async(req, res, next) => {
    //STATISTICA TRIGLICERIDE
    try {
        const [result] = await Triglycerides.fetchTRResultForAll();
        res.status(200).json(result);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchTRResultById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [tr] = await Triglycerides.fetchTRResultById(decodedToken.userId);
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
        const [tr] = await Triglycerides.fetchAllTRResultById(decodedToken.userId);
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
        const [tr] = await Triglycerides.fetchAllTRDateById(decodedToken.userId);
        res.status(200).json(tr);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchTRById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [result] = await Triglycerides.fetchTRById(decodedToken.userId);
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
      countPromises.push(Triglycerides.getCountForTR('Normal'));
      countPromises.push(Triglycerides.getCountForTR('Limita Normalului'));
      countPromises.push(Triglycerides.getCountForTR('Ridicat'));
      countPromises.push(Triglycerides.getCountForTR('Foarte Ridicat'));
  
      const counts = await Promise.all(countPromises);
  
      res.json({ counts });
    } catch (error) {
      next(error);
    }
};