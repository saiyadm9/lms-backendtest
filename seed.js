// seedCourses.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Course = require("./models/course.model"); // update path if needed

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const courses = [
  {
    "name": "ENG4U - Grade 12 English",
    "course_code": "ENG4U",
    "category": "Grade 12",
    "imgUrl": "/images/english-literature-analysis-class.jpg"
  },
  {
    "name": "SPH4U - Grade 12 Physics",
    "course_code": "SPH4U",
    "category": "Grade 12",
    "imgUrl": "/images/physics-classroom-electricity-magnetism.jpg"
  },
  {
    "name": "MCV4U - Grade 12 Calculus",
    "course_code": "MCV4U",
    "category": "Grade 12",
    "imgUrl": "/images/calculus.jpg"
  },
  {
    "name": "BOH4M - Grade 12 Business Leadership",
    "course_code": "BOH4M",
    "category": "Grade 12",
    "imgUrl": "/images/business-leadership-management-course.jpg"
  },
  {
    "name": "BBB4M - Grade 12 International Business",
    "course_code": "BBB4M",
    "category": "Grade 12",
    "imgUrl": "/images/business-education-students-classroom.jpg"
  },
  {
    "name": "MDM4U - Grade 12 Data Management",
    "course_code": "MDM4U",
    "category": "Grade 12",
    "imgUrl": "/images/data-analysis-statistics-students.jpg"
  },
  {
    "name": "MHF4U - Grade 12 Advanced Function",
    "course_code": "MHF4U",
    "category": "Grade 12",
    "imgUrl": "/images/advanced-math-functions-calculus.jpg"
  },
  {
    "name": "SCH4U - Grade 12 Chemistry",
    "course_code": "SCH4U",
    "category": "Grade 12",
    "imgUrl": "/images/chemistry-experiment-classroom-students.jpg"
  },
  {
    "name": "SBI4U - Grade 12 Biology",
    "course_code": "SBI4U",
    "category": "Grade 12",
    "imgUrl": "/images/biology-genetics-microscope-lab.jpg"
  },
  {
    "name": "MCR3U - Grade 11 Function",
    "course_code": "MCR3U",
    "category": "Grade 11",
    "imgUrl": "/images/mathematical-functions-equations-graphing.jpg"
  },
  {
    "name": "ICS3U - Grade 11 Computer",
    "course_code": "ICS3U",
    "category": "Grade 11",
    "imgUrl": "/images/computer-technology.jpg"
  },
  {
    "name": "BAF3M - Grade 11 Financial Accounting Fundamentals",
    "course_code": "BAF3M",
    "category": "Grade 11",
    "imgUrl": "/images/financial-accounting-fundamentals.jpg"
  },
  {
    "name": "SCH3U - Grade 11 Chemistry",
    "course_code": "SCH3U",
    "category": "Grade 11",
    "imgUrl": "/images/chemistry-experiment-classroom-students.jpg"
  },
  {
    "name": "SBI3U - Grade 11 Biology",
    "course_code": "SBI3U",
    "category": "Grade 11",
    "imgUrl": "/images/biology-dna-experiment-students.jpg"
  },
  {
    "name": "BMI3C - Grade 11 Marketing",
    "course_code": "BMI3C",
    "category": "Grade 11",
    "imgUrl": "/images/marketing-strategy-business-education.jpg"
  },
  {
    "name": "SPH3U - Grade 11 Physics",
    "course_code": "SPH3U",
    "category": "Grade 11",
    "imgUrl": "/images/physics-classroom-electricity-magnetism.jpg"
  },
  {
    "name": "ENG3U - Grade 11 English",
    "course_code": "ENG3U",
    "category": "Grade 11",
    "imgUrl": "/images/english-literature-reading-students.jpg"
  },
  {
    "name": "MCF3M - Grade 11 Functions and Applications",
    "course_code": "MCF3M",
    "category": "Grade 11",
    "imgUrl": "/images/mathematical-functions-equations-graphing.jpg"
  },
  {
    "name": "BEP20 - Grade 10 Launching and Leading a Business",
    "course_code": "BEP20",
    "category": "Grade 10",
    "imgUrl": "/images/biology-genetics-microscope-lab.jpg"
  },
  {
    "name": "MPM2D - Grade 10 Math",
    "course_code": "MPM2D",
    "category": "Grade 10",
    "imgUrl": "/images/students-solving-math-equations.jpg"
  },
  {
    "name": "ENG2D - Grade 10 English",
    "course_code": "ENG2D",
    "category": "Grade 10",
    "imgUrl": "/images/english-class-high-school-students.jpg"
  },
  {
    "name": "MFM2P - Grade 10 Foundations of Mathematics",
    "course_code": "MFM2P",
    "category": "Grade 10",
    "imgUrl": "/images/mathematical-functions-equations-graphing.jpg"
  },
  {
    "name": "TGJ2O - Grade 10 Communications Technology",
    "course_code": "TGJ2O",
    "category": "Grade 10",
    "imgUrl": "/images/communications-technology-media.jpg"
  },
  {
    "name": "SNC2D - Grade 10 Science",
    "course_code": "SNC2D",
    "category": "Grade 10",
    "imgUrl": "/images/Science-Lab.jpg"
  },
  {
    "name": "GLC20 - Grade 10 Career Studies",
    "course_code": "GLC20",
    "category": "Grade 10",
    "imgUrl": "/images/teaching-student.jpg"
  },
  {
    "name": "TAS20 - Grade 10 Computer Technology",
    "course_code": "TAS20",
    "category": "Grade 10",
    "imgUrl": "/images/computer-technology.jpg"
  },
  {
    "name": "SNC1W - Grade 9 Science",
    "course_code": "SNC1W",
    "category": "Grade 9",
    "imgUrl": "/images/students-solving-math-equations.jpg"
  },
  {
    "name": "ENL1W - Grade 9 English",
    "course_code": "ENL1W",
    "category": "Grade 9",
    "imgUrl": "/images/students-together-2.jpg"
  },
  {
    "name": "BBI10 - Grade 9 Introduction to Business",
    "course_code": "BBI10",
    "category": "Grade 9",
    "imgUrl": "/images/studying-together.jpg"
  },
  {
    "name": "BEM10 - Grade 9 The Entrepreneurial Mindset",
    "course_code": "BEM10",
    "category": "Grade 9",
    "imgUrl": "/images/business-education-students-classroom.jpg"
  },
  {
    "name": "GLS10 - Grade 9 Learning Strategies 1",
    "course_code": "GLS10",
    "category": "Grade 9",
    "imgUrl": "/images/learning-strategies.jpg"
  },
  {
    "name": "TAS10 - Grade 9 Technology and the Skilled Trades",
    "course_code": "TAS10",
    "category": "Grade 9",
    "imgUrl": "/images/Computer-Technology2.jpg"
  },
  {
    "name": "MTH1W - Grade 9 Math",
    "course_code": "MTH1W",
    "category": "Grade 9",
    "imgUrl": "/images/students-in-classroom.jpg"
  },
  {
    "name": "TGJ10 - Grade 9 Communications Technology",
    "course_code": "TGJ10",
    "category": "Grade 9",
    "imgUrl": "/images/communications-technology-media.jpg"
  }
]
;

(async () => {
  try {
    await Course.insertMany(courses.map(({ _id, ...rest }) => rest));
    console.log("✅ Courses seeded successfully");
  } catch (err) {
    console.error("❌ Error inserting courses:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();
