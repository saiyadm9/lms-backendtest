const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  console.log(req.body);

  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password, role });
  if (user) {
    res.status(201).json({ message: "Success" });
  } else {
    res.status(400).json({ message: "Invalid uer data" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  try {
    const user = await User.findOne({ email: lowerCaseEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...userData } = user.toObject();

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
      })
      .status(200)
      .json(userData);
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, name } = req.body;
    console.log(id, name);
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name }, // Correct update syntax
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        location: updatedUser.location,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const signout = (req, res) => {
  res.clearCookie("access_token");
  res.json({ message: "Logged out successfully" });
};
const verifyAdmin = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbiden" });
    }

    return res.status(200).json({ message: "Admin access granted" });
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Export using CommonJS
module.exports = { registerUser, loginUser, signout, verifyAdmin, updateUser };
