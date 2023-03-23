const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const arterialtensionController = require('../controllers/arterialtension');
const auth = require('../middleware/auth');

router.get('/at', auth, arterialtensionController.fetchATResultById);
router.get('/at/all', auth, arterialtensionController.fetchAllATResultById);
router.get('/at/date', auth, arterialtensionController.fetchAllATDateById);
router.get('/at/result', auth, arterialtensionController.fetchATResultForAll);
router.get('/at/resultbyID', auth, arterialtensionController.fetchATById);
router.get('/at/resultCount', auth, arterialtensionController.getATCounts);

router.post(
    '/at',
    [
        auth,
        body('sbp').trim().isLength({ min: 1 }).not().isEmpty(),
        body('dbp').trim().isLength({ min: 1 }).not().isEmpty(),
        body('user').trim().not().isEmpty()
    ], arterialtensionController.postInfoForAT
);

module.exports = router;