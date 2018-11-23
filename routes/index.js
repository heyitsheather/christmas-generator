const express     = require('express');
const router      = express.Router();
const giftRequest = require("../models/gift-request-model.js")
const { sendSignupMail } = require("../config/nodemailer-setup.js");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/thanks-requester', (req, res, next)=>{
  res.render('thanks-requester.hbs');
});

router.post("/process-request", (req, res, next) => {
  const { requesterName,
  requesterEmail,
  requesterBudget,
  recepientRelationship,
  recipientGender,
  recipientRelationship,
  recipientAge,
  recipientAdditionalInfo } = req.body;

  giftRequest.create({ requesterName,
    requesterEmail,
    requesterBudget,
    recepientRelationship,
    recipientGender,
    recipientRelationship,
    recipientAge,
    recipientAdditionalInfo })
    .then(requestDoc => {
    const { requesterName, requesterEmail } = giftDoc;
    return sendSignupMail(requesterName, requesterEmail)
    .then(() => {
      console.log("confirmation email sent to requester! ⛄️⛄️⛄️⛄️⛄️⛄️⛄️")
      res.redirect("/thanks-requester");
    });
  })
    .catch(err => next(err));
});

module.exports = router;
