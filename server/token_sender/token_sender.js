"use strict";
const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = (toEmail, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: subject,
    text: message,
  };

  return new Promise((resolve, reject) => {
    mailer.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject("error sending email: " + error);
      } else {
        resolve("email sent successfuly: " + info.response);
      }
    });
  });
};
module.exports = sendEmail;
