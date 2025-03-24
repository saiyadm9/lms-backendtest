const express = require("express");
const { isAdmin, protect } = require("../middleware/auth");
const {
  addCourse,
  getCourses,
  assignCoursesToUser,
  getAllAssignedCourses,
} = require("../controllers/courseController");

const router = express.Router();

// router.post("/addcourse", protect, isAdmin, addCourse);
// router.post("/buycourse", protect, addCourse);
router.get("/getcourses", getCourses);
router.put("/users/:userId/courses", protect, isAdmin, assignCoursesToUser);
router.get("/getassigned-courses", protect, isAdmin, getAllAssignedCourses);

module.exports = router;
