const mongoose = require('mongoose');
const giftRequest = require('../models/gift-request');

const dbName = 'christmas-generator';
mongoose.connect(`mongodb://localhost/${christmas-generator}`);

const giftRequest = [
  {
    requesterName: "Chris Kringle",
    requesterEmail: "reindeerracer@gmail.com",
    requesterBudget: "$15.00",
    recipientGender: "Male",
    recipientRelationship: "String",
    recipientAge: 13,
    recipientAdditionalInfo: "Likes video games",
  },
  {
    requesterName: "Rudolph Reindeer",
    requesterEmail: "rednose@gmail.com",
    requesterBudget: "$500.00",
    recipientGender: "Male",
    recipientRelationship: "String",
    recipientAge: 55,
    recipientAdditionalInfo: "Likes hunting and cooking",
  },
  {
    requesterName: "Raplphie Parker",
    requesterEmail: "redriderbbgun@gmail.com",
    requesterBudget: "$75.00",
    recipientGender: "Male",
    recipientRelationship: "String",
    recipientAge: 8,
    recipientAdditionalInfo: "Likes playing outside, but dislikes licking frozen poles",
  }
]