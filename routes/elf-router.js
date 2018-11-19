const express = require('express');
const router  = express.Router();


router.get("/signup", (req, res, next)=> {
  res.render("elf-views/elf-signup.hbs");
});

module.exports = router;