const { validationResult } = require('express-validator');
const ArterialTension = require('../models/arterialtension');
const jwt = require('jsonwebtoken');

exports.postInfoForAT = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const sbp = req.body.sbp;
    const dbp = req.body.dbp;
    const user = req.body.user;

    //Arterial Tension
    try {
        const arterialTensionDetails = {
            sbp: sbp,
            dbp: dbp,
            user: user
        };

        const resultAT = await ArterialTension.calculateArterialTension(arterialTensionDetails);

        const result = await ArterialTension.saveATResult({
            resultAT: resultAT,
            sbp: arterialTensionDetails.sbp,
            dbp: arterialTensionDetails.dbp,
            user: user
        });

        res.status(201).json({
            message: 'Calculul AT a fost efectuat',
            resultAT: resultAT
        });
    } catch (e) {
        res.status(e.statusCode || 500).json({ message: e.message });
    }
};

exports.fetchATResultById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [at] = await ArterialTension.fetchATResultById(decodedToken.userId);
        res.status(200).json(at);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchAllATResultById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [at] = await ArterialTension.fetchAllATResultById(decodedToken.userId);
        res.status(200).json(at);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchAllATDateById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [at] = await ArterialTension.fetchAllATDateById(decodedToken.userId);
        res.status(200).json(at);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchATResultForAll = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [result] = await ArterialTension.fetchATResultForAll(decodedToken.userId);
        res.status(200).json(result);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.fetchATById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [result] = await ArterialTension.fetchATById(decodedToken.userId);
        res.status(200).json(result);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
};

exports.getATCounts = async (req, res, next) => {
    try {
      const countPromises = [];
      countPromises.push(ArterialTension.getCountForAT('Optim'));
      countPromises.push(ArterialTension.getCountForAT('Normal'));
      countPromises.push(ArterialTension.getCountForAT('Normal crescut'));
      countPromises.push(ArterialTension.getCountForAT('Gradul I de hipertensiune'));
      countPromises.push(ArterialTension.getCountForAT('Gradul II de hipertensiune'));
      countPromises.push(ArterialTension.getCountForAT('Gradul IiI de hipertensiune'));
      countPromises.push(ArterialTension.getCountForAT('Hipertensiune izolata sistolica'));
  
      const counts = await Promise.all(countPromises);
  
      res.json({ counts });
    } catch (error) {
      next(error);
    }
};