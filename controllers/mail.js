const asyncHandler = require("../middleware/async");
const nodemailer = require("nodemailer");

//@desc      Send a mail
//@route     POST /api/v1/sendEmail
//@access    Public
exports.sendEmail = asyncHandler(async (req, res, next) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Yahoo",
    auth: {
      user: process.env.MY_MAIL,
      pass: process.env.PASS,
    },
  });

  const updatedMessage = `Name: ${name} \nEmail: ${email}\nMessage: ${message}\nThank you,\nLearnX team,\n© Paul Indsutries.`;
  const mailOptions = {
    from: process.env.MY_MAIL,
    to: process.env.ANOTHER_MAIL,
    subject: `LearnX client - ${name}`,
    text: updatedMessage,
  };
  const info = await transporter.sendMail(mailOptions);
  return res.status(200).json({
    success: true,
    data: info.response,
  });
});
