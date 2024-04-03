const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      ...req.body,
      avatar: req.file?.path,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while registering user",
      error: error.message,
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // generate token
    const token = jwt.sign({ userId: user.id }, "secret_key");
    res.json({ token });
    
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while logging in",
      error: error.message,
    });
  }
};

const getUserByToken = async (req, res, next) => {
  try {
    const userId = req.user;

    const user = await User.findByPk(userId);

    return res
      .status(200)
      .json({ success: true, message: "User fetched successfully", user });

  } catch (error) {
    res.status(500).json({
      message: "An error occurred while getting user by token",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getUserByToken,
};
