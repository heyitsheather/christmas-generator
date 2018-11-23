const nodemailer = require("nodemailer");
// const giftRequest = require("../models/gift-request-model")


const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.gmail_email,
    pass: process.env.gmail_password,
  },
});
// setup for confirmation email:
function sendSignupMail(){
  return transport.sendMail({
  from:"Your Secret Helper Elf <santas.workshop@gmail.com>",
  to:"Mr. Blah <blah@example.com>",
  subject:"",
  text:"",
  html:"",
});
}


function sendSuggestionResultMail(requesterName, requesterEmail, giftSuggestion1,
  giftSuggestion2,
  giftSuggestion3){
  return transport.sendMail({
  from:"Christmas Generator <northpoleworkshopelves@gmail.com",
  to: `${requesterName} <${requesterEmail}>`,
  subject:"Here are your Christmas gift ideas!",
  text: `We think your gift recipient would love: ${giftSuggestion1}, ${giftSuggestion2}, ${giftSuggestion3}`,
  html: `We think your gift recipient would love: ${giftSuggestion1}, ${giftSuggestion2}, ${giftSuggestion3}`,
});

}

module.exports = { sendSignupMail, sendSuggestionResultMail }