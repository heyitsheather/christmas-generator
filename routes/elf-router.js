const express = require('express');
const router  = express.Router();

const bcrypt = require("bcrypt");

const Elf = require("../models/elf-model.js");


router.get("/become-an-elf-signup", (req, res, next)=> {
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
    res.redirect("/become-an-elf-signup");
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
  res.render("elf-views/elf-workshop.hbs");
});

router.get("/become-an-elf-login", (req, res, next)=> {
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

      req.flash("error","Incorrect email. ☠️");
      res.redirect("/become-an-elf-login");
      return; // use "return" instead of a big else
    }

    //check the password
    const {encryptedPassword} = elfDoc;
    //"compareSync()" will return FALSE if "originalPassword" is WRONG
    if (!bcrypt.compareSync(originalPassword, encryptedPassword)){
      // "req.flash()" is defined by "connect-flash"
      // (2 arguments: message type and message text)
      req.flash("error", "Incorrect password 😩");
      // redirect to the login page if the password is wrong
      res.redirect("/become-an-elf-login");

    }
    else {
      //"req.logIn()" is a PAssport method that calls "serializeUsers()"
      // (that saves the USER ID in the session)
      req.logIn(elfDoc, () => {

        // "req.flash()" is defined by "connect-flash"
        // (2 arguments: message type and message text)
        req.flash("success", "Log In success! 🤓");
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
  res.redirect("/become-an-elf-signup");
});


module.exports = router;