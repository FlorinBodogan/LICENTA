const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const triglyceridesController = require('../controllers/tryglicerides');
const auth = require('../middleware/auth');

router.get('/tr', auth, triglyceridesController.fetchTRResultById);
router.get('/tr/all', auth, triglyceridesController.fetchAllTRResultById);
router.get('/tr/date', auth, triglyceridesController.fetchAllTRDateById);
router.get('/tr/result', auth, triglyceridesController.fetchTRResultForAll);
router.get('/tr/resultbyID', auth, triglyceridesController.fetchTRById);
router.get('/tr/resultCount', auth, triglyceridesController.getTRCounts);

router.post(
    '/tr',
    [
        auth,
        body('colesterol').trim().isLength({ min: 1 }).not().isEmpty(),
        body('hdl').trim().isLength({ min: 1 }).not().isEmpty(),
        body('ldl').trim().isLength({ min: 1 }).not().isEmpty(),
        body('user').trim().not().isEmpty()
    ], triglyceridesController.postInfoForTR
);

module.exports = router;