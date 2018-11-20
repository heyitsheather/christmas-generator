const express = require('express');
const router  = express.Router();

const bcrypt = require("bcrypt");

const Elf = require("../models/elf-model.js");


router.get("/become-an-elf-signup", (req, res, next)=> {
  res.render("elf-views/elf-signup.hbs");
});

router.get("/become-an-elf-login", (req, res, next)=> {
  // send flash messages to the hbs file as "messages"
  res.render("elf-views/elf-login.hbs");
});

router.post("/process-signup", (req, res, next)=> {

  const { name, surname, email, originalPassword } = req.body;

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

  Elf.create({ name, surname, email, encryptedPassword })
  .then(userDoc => {
    // "req.flash()" is defined by "connect-flash"
    // (2 arguments: message type and message text)
    req.flash("success","Signup success! 😁");
    res.redirect("/");
  })
  .catch(err => next(err));
});



module.exports = router;