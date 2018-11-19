const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const giftRequestSchema = new Schema({
  requesterName: String,
  requesterEmail: String,
  requesterBudget: String,
  recipientGender: String,
  recipientRelationship: String,
  recipientAge: Number,
  recipientAdditionalInfo: String,
}, {
  timestamps: required,
});

const giftRequest = mongoose.model("Gift Request", giftRequestSchema);

module.exports = giftRequest;