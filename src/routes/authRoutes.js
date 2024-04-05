const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserByToken,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { avatarUpload } = require("../middleware/multer");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/register", avatarUpload.single("avatar"), register);
router.post("/login", login);
router.get("/getUserByToken", authMiddleware, getUserByToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
