const jwt = require("jsonwebtoken");
const User = require("../models/User"); // import your User model

const autoLogin = async (req, res) => {
  const token = req.cookies?.access_token || req.body?.token;
  console.log("token", token);

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode", decoded);

    // Find user in DB by id from decoded token
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user info
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("JWT Verify Error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { autoLogin };
