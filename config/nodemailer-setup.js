const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.gmail_email,
    pass: process.env.gmail_password,
  },
});

function sendSignupMail(){
  return transport.sendMail({
  from:"Your Secret Helper Elf <santas.workshop@gmail.com>",
  to:"Mr. Blah <blah@example.com>",
  subject:"",
  text:"",
  html:"",
});
}



function sendSuggestionResultMail(){
  return transport.sendMail({
  from:"Your Secret Helper Elf <santas.workshop@gmail.com>",
  to:"Mr. Blah <blah@example.com>",
  subject:"",
  text:"",
  html:"",
});
}

module.exports = { sendSignupMail, sendSuggestionResultMail }