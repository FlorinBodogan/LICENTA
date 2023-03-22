const { validationResult } = require('express-validator');
const UserInfo = require('../models/userinfo');
const jwt = require('jsonwebtoken');


exports.fetchUserInfoById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [userInfo] = await UserInfo.fetchRmbById(decodedToken);
        //console.log(decodedToken);
        res.status(200).json(userInfo);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }
}

exports.fetchRmbResultById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [rmb] = await UserInfo.fetchRmbResultById(decodedToken.userId);
        res.status(200).json(rmb);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.fetchRmbAllResultById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [rmb] = await UserInfo.fetchRmbAllResultById(decodedToken.userId);
        res.status(200).json(rmb);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.fetchRmbAllResult = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [rmb] = await UserInfo.fetchRmbAllResult(decodedToken.userId);
        res.status(200).json(rmb);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.fetchRmbDateById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [rmb] = await UserInfo.fetchRmbDateById(decodedToken.userId);
        res.status(200).json(rmb);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.fetchRmbAllDateById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [rmb] = await UserInfo.fetchRmbAllDateById(decodedToken.userId);
        res.status(200).json(rmb);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.fetchBmiResultById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [bmi] = await UserInfo.fetchBmiResultById(decodedToken.userId);
        res.status(200).json(bmi);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.fetchBmiAllResultById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [bmi] = await UserInfo.fetchBmiAllResultById(decodedToken.userId);
        res.status(200).json(bmi);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.fetchBmiAllResult = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [bmi] = await UserInfo.fetchBmiAllResult(decodedToken.userId);
        res.status(200).json(bmi);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.fetchBmiAllCategories = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [bmi] = await UserInfo.fetchBmiAllCategories(decodedToken.userId);
        res.status(200).json(bmi);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.fetchBmiDateById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [bmi] = await UserInfo.fetchBmiDateById(decodedToken.userId);
        res.status(200).json(bmi);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.fetchBmiAllDateById = async(req, res, next) => {
    try {
        let decodedToken = await jwt.verify(req.headers.authorization.split(" ")[1], 'secretWebToken');
        const [bmi] = await UserInfo.fetchBmiAllDateById(decodedToken.userId);
        res.status(200).json(bmi);

    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
            console.log(e);
        }
        next(e);
    }
}

exports.postUserInforRmb = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = req.body.user;
    const gender = req.body.gender;
    const age = req.body.age;
    const height = req.body.height;
    const weight = req.body.weight;
    const activitylevel = req.body.activitylevel;

    //RMB
    try {
        const rmbDetails = {
            gender: gender,
            age: age,
            height: height,
            weight: weight,
            activitylevel: activitylevel,
            user: user
        };

        const details = await UserInfo.saveDetailsForRmb(rmbDetails);

        const resultRmb = parseInt(UserInfo.calculateRmb(rmbDetails));

        const result = await UserInfo.saveRmbResult({
            resultRmb: resultRmb,
            user: user
        });

        res.status(201).json({
            message: 'Calculul a fost efectuat',
            resultRmb: resultRmb
        });
    } catch (e) {
        res.status(e.statusCode || 500).json({ message: e.message });
    }
};

exports.postUserInforBmi = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = req.body.user;
    const height = req.body.height;
    const weight = req.body.weight;
    //BMI
    try {
      const bmiDetails = {
        height: height,
        weight: weight,
        user: user
      }
  
      const details = await UserInfo.saveDetailsForBmi(bmiDetails);
      const bmiResult = UserInfo.calculateBmi(bmiDetails);
  
      const result = await UserInfo.saveBmiResult({
        resultBmi: bmiResult.bmi,
        category: bmiResult.category,
        user: user
      });
      res.status(201).json({
        message: 'Calculul a fost efectuat',
        resultBmi: bmiResult.bmi,
        category: bmiResult.category
      });
  
    } catch (e) {
      res.status(e.statusCode || 500).json({ message: e.message });
    }
};

exports.getBmiCategoryCounts = async (req, res, next) => {
    try {
      const countPromises = [];
      countPromises.push(UserInfo.getCountForBmiCategory('Subponderal'));
      countPromises.push(UserInfo.getCountForBmiCategory('Normal'));
      countPromises.push(UserInfo.getCountForBmiCategory('Supraponderal'));
      countPromises.push(UserInfo.getCountForBmiCategory('Obez'));
  
      const counts = await Promise.all(countPromises);
  
      res.json({ counts });
    } catch (error) {
      next(error);
    }
};

exports.deleteUserInfo = async(req, res, next) => {
    try {
        const deleteuserInfo = await UserInfo.delete(req.params.id);
        res.status(200).json(deleteuserInfo);
    } catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }
}