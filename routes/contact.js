const express = require("express");
const { userMessageHandler } = require("../controllers/contactFormController");

const router = express.Router();

router.post("/contact-aos", userMessageHandler);

module.exports = router;
