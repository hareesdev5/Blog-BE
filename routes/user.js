const express = require("express");
const userController = require("../controller/user.js");
const Auth = require('../common/auth.js')

const router = express.Router();

router.post("/signUp", userController.createUser);
router.post('/login',userController.login)

module.exports = router;
