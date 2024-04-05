const nodemailer = require("nodemailer");
const {passwordResetTemp} = require('./mailTemplates');


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kumarchembeti26@gmail.com",
    pass: "ngtvzmbbjgymdqll",
  },
  debug: true,
});


const passwordResetMail = async (mail, token) => {
  try {

    const info = await transporter.sendMail({
      from:"kumarchembeti26@gmail.com",
      to: mail,
      subject: "Password Reset",
      html: passwordResetTemp(token),
    });

    console.log(token);
    console.log("Message sent: %s", info.messageId);

  } catch (error) {
    console.log("error while sending mail", error);
  }
};

module.exports = {
  passwordResetMail,
};
