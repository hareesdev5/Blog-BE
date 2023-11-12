const express = require("express");
const dashboardController = require("../controller/dashboard.js");
const Auth = require('../common/auth.js')
const router = express.Router();

router.get("/blogs",dashboardController.getAllBlogs);

module.exports = router;
