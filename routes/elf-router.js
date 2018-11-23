const express     = require('express');
const router      = express.Router();
const bcrypt      = require("bcrypt");
const Elf         = require("../models/elf-model.js");
const giftRequest = require("../models/gift-request-model.js");
const { sendSuggestionResultMail } = require("../config/nodemailer-setup.js");


router.get("/elf-signup", (req, res, next)=> {
  res.render("elf-views/elf-signup.hbs");
});

router.post("/process-signup", (req, res, next)=> {

  const { 
    name, 
    surname, 
    email, 
    originalPassword 
  } = req.body;

  // THIS IS WHERE WE CHECK THE PASSWORD RULES
  if(!originalPassword || originalPassword.match(/[0-9]/) === null){
    // "req.flash()" is defined by "connect-flash"
    // (2 arguments: message type and message text)
    req.flash("error", "Password can't be blank and must contain a number");
    // redirect to signup page if password is blank or doesn't container a digit
    res.redirect("/elf-signup");
    return; // use "return" instaead of a big else
  }

  //encrypt the submitted password before saving
  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  Elf.create({ 
    name, 
    surname, 
    email, 
    encryptedPassword 
  })
  .then(elfDoc => {
    // "req.flash()" is defined by "connect-flash"
    // (2 arguments: message type and message text)
    req.flash("success","Awesome! You become an Elf! 😁");
    res.redirect("/workshop");
  })
  .catch(err => next(err));
});

router.get("/workshop", (req, res, next)=> {

  if(!req.user){
    // AUTHORIZATION: You have to be logged-in AS AN ADMIN to visit this page
    req.flash("error","Sorry, only elves can enter in the workshop space.");
    req.session.save(() => {
      res.redirect("/elf-login");
    });
    res.redirect("/elf-login");
    return; //use "return" instead of a big else
  }

  giftRequest.find({ hasReceivedSuggestion: { $eq: false } })
  //console.log(giftArray)
  .then(giftResults => {
   console.log(giftResults)

    res.locals.giftArray = giftResults;
    res.render("elf-views/elf-workshop.hbs");

    return sendSuggestionResultMail;
  })
  .catch(err => next(err));

});

router.post( "/process-update/:giftId", (req, res, next) => {
  // get the ID from the URL (it's inside the "req.params" object)
  const { giftId } = req.params;

  // get the user inputs from inside "req.body"
  // (we use "req.body" because it's a POST form)
 
  const { firstGiftIdea,
  secondGiftIdea,
  thirdGiftIdea} = req.body;

  // save user inputs in an existing book document
  giftRequest.findByIdAndUpdate(
    giftId, // ID of the document to update
    { $set: { giftSuggestion1: firstGiftIdea,
    giftSuggestion2: secondGiftIdea,
    giftSuggestion3: thirdGiftIdea,
    hasReceivedSuggestion: true}}, // changes to be made to the document
    { runValidators: true, new: true } // additional settings
  )
  .then(giftDoc=> {
    const { requesterName, requesterEmail, giftSuggestion1, giftSuggestion2, giftSuggestion3 } = giftDoc;
    return sendSuggestionResultMail(requesterName, requesterEmail, giftSuggestion1, giftSuggestion2, giftSuggestion3)
      .then(() => {
        // res.render('message', {requesterName, requesterEmail, giftSuggestion1, giftSuggestion2, giftSuggestion3});
        console.log("email with suggestions sent!🎄🎄🎄🎄🎅")
        res.redirect(`/workshop`);
      });
  })
  // "next()" skips to the error handler in "bin/www"
  .catch(err => next(err));
});

router.get("/elf-login", (req, res, next)=> {
  // send flash messages to the hbs file as "messages"
  res.render("elf-views/elf-login.hbs");
});

router.post("/process-login", (req, res, next)=> {
  const { email, originalPassword} = req.body;

  Elf.findOne( { email: { $eq: email }} )
  .then(elfDoc => {
    //HERE WE WILL CHECK IF THE EMAIL IS WRONG
    //userDoc will be empty if the email is wrong
    if(!elfDoc){

      req.flash("error","Incorrect email.");
      //next function to show correctly the "incorrect email"
      req.session.save(() => {
        res.redirect("/elf-login");
      });
      return; // use "return" instead of a big else
    }

    //check the password
    const {encryptedPassword} = elfDoc;
    //"compareSync()" will return FALSE if "originalPassword" is WRONG
    if (!bcrypt.compareSync(originalPassword, encryptedPassword)){
      // "req.flash()" is defined by "connect-flash"
      // (2 arguments: message type and message text)
      req.flash("error", "Incorrect password, try regain.");
      //next function to show correctly the "incorrect password"
      req.session.save(() => {
        res.redirect("/elf-login");
      });
      // redirect to the login page if the password is wrong
      res.redirect("/elf-login");

    }
    else {
      //"req.logIn()" is a PAssport method that calls "serializeUsers()"
      // (that saves the USER ID in the session)
      req.logIn(elfDoc, () => {

        // "req.flash()" is defined by "connect-flash"
        // (2 arguments: message type and message text)
        req.flash("success", "Log In success!");
             // redirect to the home page if the password is CORRECT
        res.redirect("/workshop");

      })
    };
  })
  .catch(err => next(err));
});

router.get("/logout", (req, res, next) => {
  // "req.logOut" is a Passport method that removes the user ID from session
  req.logOut();

  req.flash("success","Logged out successfully! ");
  req.session.save(() => {
    res.redirect("/elf-login");
  });
  res.redirect("/elf-login");
});


module.exports = router;