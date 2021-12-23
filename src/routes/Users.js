const express = require("express");
const router = express.Router();
const Users = require('../controllers/Controller.User');

router.get('/', Users.getAll);

module.exports = router;