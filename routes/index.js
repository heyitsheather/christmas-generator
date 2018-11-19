const express = require('express');
const router  = express.Router();
const giftRequest = require ("../models/gift-request-model")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/elf-login', (req, res, next) => {
  res.render('elf-login.hbs');
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
      res.redirect("/thanks-requester.hbs");
    })
    .catch(err => next(err));
});

module.exports = router;
