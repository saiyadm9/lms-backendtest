const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (res, user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};

const registerUser = async (req, res) => {
  console.log(req.body);

  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, role });
  if (user) {
    generateToken(res, user);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
