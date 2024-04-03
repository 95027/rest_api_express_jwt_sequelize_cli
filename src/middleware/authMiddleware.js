const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = await jwt.verify(
      token,
      "secret_key" ,  {expiresIn: "1h"}
    );
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid" });
  }
};

module.exports = auth;
