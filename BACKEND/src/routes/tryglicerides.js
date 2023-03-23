const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const trygliceridesController = require('../controllers/tryglicerides');
const auth = require('../middleware/auth');

router.get('/tr', auth, trygliceridesController.fetchTRResultById);
router.get('/tr/all', auth, trygliceridesController.fetchAllTRResultById);
router.get('/tr/date', auth, trygliceridesController.fetchAllTRDateById);
router.get('/tr/result', auth, trygliceridesController.fetchTRResultForAll);
router.get('/tr/resultbyID', auth, trygliceridesController.fetchTRById);
router.get('/tr/resultCount', auth, trygliceridesController.getTRCounts);

router.post(
    '/tr',
    [
        auth,
        body('colesterol').trim().isLength({ min: 1 }).not().isEmpty(),
        body('hdl').trim().isLength({ min: 1 }).not().isEmpty(),
        body('ldl').trim().isLength({ min: 1 }).not().isEmpty(),
        body('user').trim().not().isEmpty()
    ], trygliceridesController.postInfoForTR
);

module.exports = router;