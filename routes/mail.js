const express = require("express");
const { sendEmail } = require("../controllers/mail");
const router = express.Router();

router.route("/").post(sendEmail);

module.exports = router;
