const express = require("express");
const { isAdmin, protect } = require("../middleware/auth");
const {
  addCourse,
  getCourses,
  updateUserCourses,
} = require("../controllers/courseController");

const router = express.Router();

router.post("/addcourse", protect, isAdmin, addCourse);
router.get("/getcourses", getCourses);
router.put("/users/:userId", protect, isAdmin, updateUserCourses);

module.exports = router;
