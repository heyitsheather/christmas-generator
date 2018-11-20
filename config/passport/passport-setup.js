const passport = require ("passport");

const Elf = require("../../models/elf-model.js");

// serializeUser(): defines what data to save in the session
// (happens when you log in successfully)
passport.serializeUser((elfDoc, done) => {
  console.log("SERIALIZE (save user ID to session)");
  // call done() with null and the result if it's successful
  // (the result is the user's ID that we want to save in the session)
  done(null, elfDoc._id)
});

//deserializeUser(): defines how to retrieve the user information form the DB
// (happens automatically on EVERY request AFTER you log in )
passport.deserializeUser((elfId, done)=> {
  console.log("DESERIALIZE (retrieving user info from th DB) 🐓");
  
  Elf.findById(elfId)
  .then(elfDoc => {
    // call done() with null and the result if it's successful
    // (the result is the user document from the database)
    done(null,elfDoc);
  })
  // call done() with th error object if it fails
  .catch(err => done(err));
});