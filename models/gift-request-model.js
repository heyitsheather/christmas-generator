const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

//update "helper elf" suggestions with elf object data names
const giftRequestSchema = new Schema({
  requesterName: { type: String, required: true },
  requesterEmail: { type: String, required: true },
  requesterBudget: { type: String, required: true },
  recipientRelationship: { type: String, required: true },
  recipientGender: { type: String, required: true },
  recipientAge: { type: Number, required: true },
  recipientAdditionalInfo: { type: String},
  giftSuggestion1: { type: String},
  giftSuggestion2: { type: String},
  giftSuggestion3: { type: String},
  hasReceivedSuggestion: {type: Boolean, default: false}
  
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
  timestamps: true,
});

const giftRequest = mongoose.model("Gift Request", giftRequestSchema);

module.exports = giftRequest;