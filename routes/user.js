const express = require("express");
const { getUsers } = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/users", protect, isAdmin, getUsers);

module.exports = router;
