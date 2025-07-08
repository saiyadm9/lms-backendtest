const express = require("express");
const { getUsers } = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/users", getUsers);

module.exports = router;
