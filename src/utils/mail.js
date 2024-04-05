const nodemailer = require("nodemailer");
const {passwordResetTemp} = require('./mailTemplates');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const passwordResetMail = async (mail, token) => {
  try {

    const info = await transporter.sendMail({
      from:process.env.EMAIL_USER,
      to: mail,
      subject: "Password Reset",
      html: passwordResetTemp(token),
    });

    console.log("Message sent: %s", info.messageId);

  } catch (error) {
    console.log("error while sending mail", error);
  }
};

module.exports = {
  passwordResetMail,
};
