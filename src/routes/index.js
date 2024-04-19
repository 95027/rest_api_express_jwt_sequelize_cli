const router = require('express').Router();


const adminAuth = require('../routes/admin/authRoutes');

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

router.use('/admin', adminAuth);

module.exports = router;