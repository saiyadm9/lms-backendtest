const courseModel = require("../models/course.model");
const User = require("../models/User");
const UserCourses = require("../models/assignedcourse.model");

// Add Course (Admin Only)
const addCourse = async (req, res) => {
  try {
    const { title, description, price, instructorId } = req.body;

    // Check if the instructor is already assigned to a course with the same title
    const existingCourse = await courseModel.findOne({
      title,
      instructor: instructorId,
    });

    if (existingCourse) {
      return res
        .status(400)
        .json({ error: "Instructor is already assigned to this course" });
    }

    const newCourse = new courseModel({
      title,
      description,
      price,
      instructor: instructorId,
    });

    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Courses
const getCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const assignCoursesToUser = async (req, res) => {
  const { userId } = req.params;
  const { courses } = req.body;

  console.log("userId", userId);
  console.log("courses", courses);

  // Validation: Courses should be an array
  if (!Array.isArray(courses)) {
    return res.status(400).json({ message: "Courses must be an array" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedCourses = await UserCourses.findOneAndUpdate(
      { user: userId },
      { $set: { courses: courses } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "Courses assigned successfully",
      assignedCourses: updatedCourses,
    });
  } catch (error) {
    console.error("Error assigning courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllAssignedCourses = async (req, res) => {
  try {
    const assignedCourses = await UserCourses.find()
      .populate("user", "name email")
      .populate("courses", "name category")
      .exec();

    res.status(200).json({ assignedCourses });
  } catch (error) {
    console.error("Error fetching assigned courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addCourse,
  getCourses,
  assignCoursesToUser,
  getAllAssignedCourses,
};
