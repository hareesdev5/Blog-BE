const express = require("express");
const userRouter = require("./user.js");
const blogRouter = require("./blog.js");
const dashboardRouter = require("./dashboard.js");

const router = express.Router();

router.use("/user", userRouter);
router.use("/blog", blogRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;
