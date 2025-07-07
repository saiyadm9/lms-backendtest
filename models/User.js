const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true},
    password: { type: String },
    role: { type: String, enum: ["admin", "instructor", "student"], default: "student" },
		address: { type: String, default: "" },
    phone: { type: String, default: "" },
		courses: [
			{
				courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
				courseName: { type: String, required: true },
				links: [String], // Classroom links for this specific course
			}
  	]
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
