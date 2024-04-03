const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserByToken,
} = require("../controllers/authController");

const { avatarUpload } = require("../middleware/multer");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", avatarUpload.single("avatar"), register);
router.post("/login", login);
router.get("/token", authMiddleware, getUserByToken);

module.exports = router;
