const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies?.access_token || req.body?.token;
  // console.log("token", token);

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decode", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  // console.log("isadmin", req.user.role);

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized as admin" });
  }
  next();
};

module.exports = { protect, isAdmin };
