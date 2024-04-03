const express = require('express');
const router = express.Router();
const {profile} = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/profile', auth, profile);


module.exports = router;