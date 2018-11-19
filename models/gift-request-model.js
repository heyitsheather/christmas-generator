const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

//TODO: add validations and requirements to schema
//update "helper elf" suggestions with elf object data names
const giftRequestSchema = new Schema({
  requesterName: String,
  requesterEmail: String, 
  requesterBudget: String,
  recepientRelationship: String,
  recipientGender: String,
  recipientRelationship: String,
  recipientAge: Number,
  recipientAdditionalInfo: String,
  giftSuggestions: String
  
  
  // [
    
  //   {
  //     author: 
  //       {type: Schema.Types.ObjectId,
  //       ref: "Helper Elf"},
  //     content: String
  //   }
  // ],

},
 {
  timestamps: required,
});

const giftRequest = mongoose.model("Gift Request", giftRequestSchema);

module.exports = giftRequest;