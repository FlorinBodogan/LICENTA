const { validationResult } = require('express-validator');
const ArterialTension = require('../models/arterialtension');
const jwt = require('jsonwebtoken');

exports.postInfoForAT = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const spb = req.body.spb;
    const dpb = req.body.dpb;
    const user = req.body.user;

    //Arterial Tension
    try {
        const arterialTensionDetails = {
            spb: spb,
            dpb: dpb,
            user: user
        };

        const resultAT = await ArterialTension.calculateArterialTension(arterialTensionDetails);

        const result = await ArterialTension.saveATResult({
            resultAT: resultAT,
            spb: arterialTensionDetails.spb,
            dpb: arterialTensionDetails.dpb,
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