const express = require("express");
const router = express.Router();
const Auth = require('../controllers/Controller.Auth');

router.post('/register', Auth.register);

router.post('/login', Auth.login);

// router.post('/forget-pass', Auth.forgetPass);

// router.post('/reset-pass', Auth.reset);

module.exports = router;