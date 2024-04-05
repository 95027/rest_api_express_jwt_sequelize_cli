const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/userController');
const { avatarUpload } = require('../middleware/multer');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', avatarUpload.single('avatar'), updateUser);
router.delete('/:id', deleteUser);


module.exports = router;