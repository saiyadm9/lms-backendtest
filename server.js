const express = require("express");
const helmet = require("helmet");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  headers: true, // Show rate limit info in headers
});

dotenv.config();
connectDB();

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Allow requests only from your frontend URL
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.use(cookieParser());
app.use(limiter);
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/user"));
app.use("/api/admin", require("./routes/course"));
app.use("/api/message", require("./routes/contact"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

