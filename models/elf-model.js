//elf model

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const elfSchema = new Schema({
//favorite christmas carol
name: {
  type: String,
  required: true,
  minlength: 2,
},
surname: {
  type: String,
  required: true,
  minlength: 2,
},
email: {
 type: String,
 required: true,
 unique: true,
 match: /^.+@.+\..+$/,
}, 
avatar: {
 type: String
},
encryptedPassword: {
 type: String,
},
rewards: [{
  type: String,
}],
}, {
  timestamps: true,
});

const Elf = mongoose.model("Elf", elfSchema);

module.exports = Elf;