const express = require('express');
const router  = express.Router();


router.get("/become-an-elf-signup", (req, res, next)=> {
  res.render("elf-views/elf-signup.hbs");
});

router.get("/become-an-elf-login", (req, res, next)=> {
  // send flash messages to the hbs file as "messages"
  res.render("elf-views/elf-login.hbs");
});

module.exports = router;