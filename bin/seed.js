require('dotenv').config();

const mongoose = require('mongoose');
const giftRequest = require('../models/gift-request-model');


mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const requestData = [
  {
    requesterName: "Chris Kringle",
    requesterEmail: "reindeerracer@gmail.com",
    requesterBudget: "$15.00",
    recipientGender: "Male",
    recipientRelationship: "String",
    recipientAge: 13,
    recipientAdditionalInfo: "Likes video games",
    giftSuggestion1: '',
    giftSuggestion2: '',
    giftSuggestion3: '',
    hasReceivedSuggestion: false,
  },
  {
    requesterName: "Rudolph Reindeer",
    requesterEmail: "rednose@gmail.com",
    requesterBudget: "$500.00",
    recipientGender: "Male",
    recipientRelationship: "String",
    recipientAge: 55,
    recipientAdditionalInfo: "Likes hunting and cooking",
    giftSuggestion1: '',
    giftSuggestion2: '',
    giftSuggestion3: '',
    hasReceivedSuggestion: false,
  },
  {
    requesterName: "Raplphie Parker",
    requesterEmail: "redriderbbgun@gmail.com",
    requesterBudget: "$75.00",
    recipientGender: "Male",
    recipientRelationship: "String",
    recipientAge: 8,
    recipientAdditionalInfo: "Likes playing outside, but dislikes licking frozen poles",
    giftSuggestion1: '',
    giftSuggestion2: '',
    giftSuggestion3: '',
    hasReceivedSuggestion: false,
  },
];

// giftRequest.create(giftRequests, (err) => {
//   if (err) { throw(err) }
//   console.log(`Created ${giftRequests.length}`)
//   mongoose.connection.close()
// });

 
      
 giftRequest.create(requestData)
        .then(requestDoc => {
          console.log(`Created REQUEST! ${requestDoc.length}`);
        })
        .catch(err => {
          console.log("REQUEST Create FAIL!! 🤬", err);
        });