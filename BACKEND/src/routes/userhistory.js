const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userhistoryController = require('../controllers/userhistory');
const userinfoController = require('../controllers/userinfo');
const auth = require('../middleware/auth');

router.get('/rmb/all', auth, userhistoryController.fetchRmbAllResultWithParamsById);
router.get('/bmi/all', auth, userhistoryController.fetchBmiAllResultWithParamsById);
router.get('/tr/allWithParams', auth, userhistoryController.fetchAllTRResultWithParamsById);
router.get('/at/allWithParams', auth, userhistoryController.fetchAllATResultWithParamsById);
router.get('/col/allWithParams', auth, userhistoryController.fetchAllCOLResultWithParamsById);

module.exports = router;