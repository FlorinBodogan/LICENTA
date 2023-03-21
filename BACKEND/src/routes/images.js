const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');
const path = require('path');

const auth = require('../middleware/auth');

const imageController = require('../controllers/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});
  
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), auth, imageController.uploadImage);

router.get('/', auth, imageController.fetchById);

module.exports = router;