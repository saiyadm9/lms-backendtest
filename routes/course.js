const express = require("express");
const { isAdmin, protect } = require("../middleware/auth");
const {
  addCourse,
  getCourses,
  updateUserCourses,
  removeUserCourse,
  removeUserCourseLink,
} = require("../controllers/courseController");

const router = express.Router();

// Admin-only: Add a new course
router.post("/addcourse", protect, isAdmin, addCourse);

// Public: Get all courses
router.get("/getcourses", getCourses);

// Admin: Assign or update a student's course list (with links)
router.put("/users/:userId", protect, isAdmin, updateUserCourses);

module.exports = router;
