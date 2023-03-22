const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const arterialtensionController = require('../controllers/arterialtension');
const auth = require('../middleware/auth');

router.get('/at', auth, arterialtensionController.fetchATResultById);
router.get('/at/all', auth, arterialtensionController.fetchAllATResultById);
router.get('/at/date', auth, arterialtensionController.fetchAllATDateById);

router.post(
    '/at',
    [
        auth,
        body('spb').trim().isLength({ min: 1 }).not().isEmpty(),
        body('dpb').trim().isLength({ min: 1 }).not().isEmpty(),
        body('user').trim().not().isEmpty()
    ], arterialtensionController.postInfoForAT
);

module.exports = router;