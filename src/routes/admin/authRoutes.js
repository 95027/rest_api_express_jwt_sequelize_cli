const express = require('express');
const { login, getAdminByToken } = require('../../controllers/admin/authController');
const auth = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/login', login);
router.post('/getAdminByToken', auth, getAdminByToken);


module.exports = router;