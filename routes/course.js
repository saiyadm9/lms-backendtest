const express = require("express");
const { isAdmin, protect } = require("../middleware/auth");
const {
  addCourse,
  getCourses,
  updateUserCourses,
} = require("../controllers/courseController");

const router = express.Router();

router.post("/addcourse", addCourse);
router.get("/getcourses", getCourses);
router.put("/users/:userId", updateUserCourses);

module.exports = router;
