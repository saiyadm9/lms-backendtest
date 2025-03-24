const express = require("express");
const {
  registerUser,
  loginUser,
  signout,
  verifyAdmin,
  updateUser,
} = require("../controllers/authController");
const { protect, isAdmin } = require("../middleware/auth");
const { autoLogin } = require("../controllers/autoLogin.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/auto-login", autoLogin);
router.post("/signout", signout);
router.post("/verify-admin", verifyAdmin);
router.patch("/update-user", updateUser);

module.exports = router;
