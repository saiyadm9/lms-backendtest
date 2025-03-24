const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getUsers };
