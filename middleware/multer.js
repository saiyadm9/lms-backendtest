const multer = require("multer");

// Storage engine (store image in memory as Buffer)
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
