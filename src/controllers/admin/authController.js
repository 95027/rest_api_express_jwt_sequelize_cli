const { Admin } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isvaildPass = await bcrypt.compare(password, admin.password);

    if (!isvaildPass) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while logging in",
      error: error.message,
    });
  }
};

const getAdminByToken = async (req, res, next) => {
    
  const adminId = req.user;

  try {
    if (!adminId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const admin = await Admin.findByPk(adminId);

    return res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while getting admin by token",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  getAdminByToken,
};
