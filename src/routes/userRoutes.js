const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/authController');
const {avatarUpload} = require('../middleware/multer');

router.post('/register',avatarUpload.single('avatar'), register);
router.post('/login', login);




module.exports = router;