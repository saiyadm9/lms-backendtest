const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
	course_code: {
		type: String,
		required: true,
		unique: true,
	},
  category: {
    type: String,
    required: true,
  },
	imgUrl: {
		type: String,
		default: "",
  }
});

module.exports = mongoose.model("Course", courseSchema);
