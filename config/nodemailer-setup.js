const nodemailer = require("nodemailer");



const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.gmail_email,
    pass: process.env.gmail_password,
  },
});
// setup for confirmation email:
function sendSignupMail(requesterName, requesterEmail){
  return transport.sendMail({
  from:"Christmas Generator <northpoleworkshopelves@gmail.com>",
  to:`${requesterName} <${requesterEmail}>`,
  subject:`${requesterName}, your request arrived to the North Pole`,
  text:"Our elves have their pointy thinking caps on, and will send you another email when they've thought of the perfect gift!",
  html:"Our elves have their pointy thinking caps on, and will send you another email when they've thought of the perfect gift!",
});
}


function sendSuggestionResultMail(requesterName, requesterEmail, giftSuggestion1,
  giftSuggestion2,
  giftSuggestion3){
  return transport.sendMail({
  from:"Christmas Generator <northpoleworkshopelves@gmail.com>",
  to: `${requesterName} <${requesterEmail}>`,
  subject:"Here are your Christmas gift ideas!",
  text: `We think your gift recipient would love: ${giftSuggestion1}, ${giftSuggestion2}, ${giftSuggestion3}`,
  html: `We think your gift recipient would love: ${giftSuggestion1}, ${giftSuggestion2}, ${giftSuggestion3}`,
});

}

module.exports = { sendSignupMail, sendSuggestionResultMail }