const Course = require("../models/course.model");
const User = require("../models/User");
const UserCourses = require("../models/assignedcourse.model");

// Add Course (Admin Only)
const addCourse = async (req, res) => {
  try {
    const { name, course_code, category, imgUrl } = req.body;
		console.log(req.body);

    // Check if course code already exists
    const existing = await Course.findOne({ course_code });
    if (existing) {
      return res.status(400).json({ error: "Course code already exists" });
    }

    const newCourse = new Course({ name, course_code, category, imgUrl });
    await newCourse.save();

    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Add course error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign or Update Courses to User

const updateUserCourses = async (req, res) => {
  const { userId } = req.params;
  const { courses, phone, address } = req.body;

  if (!Array.isArray(courses)) {
    return res.status(400).json({ error: "Courses must be an array" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Validate each course
    for (const course of courses) {
      if (!course.courseId || !course.courseName) {
        return res.status(400).json({ error: "Each course must have courseId and courseName" });
      }

      if (!Array.isArray(course.links)) {
        course.links = [];
      }
    }

    user.courses = courses;

    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;

    await user.save();

    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Remove a Course from User
const removeUserCourse = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { courses: { courseId } },
    });

    res.status(200).json({ message: "Course removed from user" });
  } catch (error) {
    console.error("Remove course error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Remove a Link from a Course in User
const removeUserCourseLink = async (req, res) => {
  const { userId, courseId, linkIndex } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const course = user.courses.find(c => c.courseId.toString() === courseId);
    if (!course) return res.status(404).json({ error: "Course not assigned to user" });

    course.links.splice(linkIndex, 1); // remove the link
    await user.save();

    res.status(200).json({ message: "Link removed", updatedCourse: course });
  } catch (error) {
    console.error("Remove link error:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  addCourse,
  getCourses,
  updateUserCourses,
  removeUserCourse,
  removeUserCourseLink,
};
