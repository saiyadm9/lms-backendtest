const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User"); // adjust path if needed

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const deleteAllUsers = async () => {
  try {
    await connectDB();
    const res = await User.deleteMany({});
    console.log(`✅ Deleted ${res.deletedCount} users`);
    process.exit();
  } catch (error) {
    console.error("❌ Error deleting users:", error);
    process.exit(1);
  }
};

deleteAllUsers();
