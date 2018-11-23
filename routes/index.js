const express     = require('express');
const router      = express.Router();
const giftRequest = require("../models/gift-request-model.js")
const { sendSignupMail } = require("../config/nodemailer-setup.js");


/* GET home page */
router.get('/', (req, res, next) => {
  res.locals.body_class = "bg-homepage";
  res.render('index');

});

router.get('/thanks-requester', (req, res, next)=>{
  res.render('thanks-requester.hbs');
  res.locals.body_class = "bg-homepage";
});

router.post("/process-request", (req, res, next) => {
  const { requesterName,
  requesterEmail,
  requesterBudget,
  recipientGender,
  recipientRelationship,
  recipientAge,
  recipientAdditionalInfo } = req.body;
    console.log(req.body, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhh')
  giftRequest.create({ requesterName,
    requesterEmail,
    requesterBudget,
    recipientGender,
    recipientRelationship,
    recipientAge,
    recipientAdditionalInfo })
    .then(requestDoc => {
    const { requesterName, requesterEmail } = requestDoc;
    return sendSignupMail(requesterName, requesterEmail)
    .then((requestDoc) => { 
      console.log("confirmation email sent to requester! ⛄️⛄️⛄️⛄️⛄️⛄️⛄️", requestDoc)
      res.redirect("/thanks-requester");
    });
  })
    .catch(err => next(err));
});

module.exports = router;
