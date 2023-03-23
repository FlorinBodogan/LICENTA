const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userinfoController = require('../controllers/userinfo');
const auth = require('../middleware/auth');

router.get('/rmb', auth, userinfoController.fetchRmbResultById);
router.get('/rmb/activity', auth, userinfoController.fetchActivityLevelForAll);
router.get('/rmb/activityCount', auth, userinfoController.getActivityCounts);
router.get('/rmb/all', auth, userinfoController.fetchRmbAllResultById);
router.get('/rmb/date', auth, userinfoController.fetchRmbAllDateById);
router.get('/rmb/weight', auth, userinfoController.fetchWeightById);

router.get('/bmi', auth, userinfoController.fetchBmiResultById);
router.get('/bmi/all', auth, userinfoController.fetchBmiAllResultById);
router.get('/bmi/date', auth, userinfoController.fetchBmiAllDateById);
router.get('/bmi/category', auth, userinfoController.fetchBmiAllCategories);
router.get('/bmi/categoryCount', auth, userinfoController.getBmiCategoryCounts);

router.post(
    '/rmb',
    [
        auth,
        body('gender').trim().isLength({ min: 3 }).not().isEmpty(),
        body('age').trim().isLength({ min: 1 }).not().isEmpty(),
        body('height').trim().isLength({ min: 1 }).not().isEmpty(),
        body('weight').trim().isLength({ min: 1 }).not().isEmpty(),
        body('activitylevel').isLength({ min: 3 }).trim().not().isEmpty(),
        body('user').trim().not().isEmpty()
    ], userinfoController.postUserInforRmb
);

router.post(
    '/bmi',
    [
        auth,
        body('weight').trim().isLength({ min: 1 }).not().isEmpty(),
        body('height').trim().isLength({ min: 1 }).not().isEmpty(),
        body('user').trim().not().isEmpty()
    ], userinfoController.postUserInforBmi
);

router.delete('/:id', auth, userinfoController.deleteUserInfo);

module.exports = router;