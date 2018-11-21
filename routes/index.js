const express     = require('express');
const router      = express.Router();
const giftRequest = require("../models/gift-request-model.js")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/become-an-elf-login', (req, res, next) => {
  res.render('elf-views/elf-login.hbs');
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
      res.redirect("/thanks-requester");
    })
    .catch(err => next(err));
});

module.exports = router;
