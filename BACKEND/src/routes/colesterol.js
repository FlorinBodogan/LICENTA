const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const colesterolController = require('../controllers/colesterol');
const auth = require('../middleware/auth');

router.get('/col', auth, colesterolController.fetchCOLResultById);
router.get('/col/all', auth, colesterolController.fetchAllCOLResultById);
router.get('/col/date', auth, colesterolController.fetchAllCOLDateById);
router.get('/col/result', auth, colesterolController.fetchCOLResultForAll);
router.get('/col/resultbyID', auth, colesterolController.fetchCOLById);
router.get('/col/resultCount', auth, colesterolController.getCOLCounts);

router.post(
    '/col',
    [
        auth,
        body('hdl').trim().isLength({ min: 1 }).not().isEmpty(),
        body('ldl').trim().isLength({ min: 1 }).not().isEmpty(),
        body('triglycerides').trim().isLength({ min: 1 }).not().isEmpty(),
        body('user').trim().not().isEmpty()
    ], colesterolController.postInfoForCOL
);

module.exports = router;