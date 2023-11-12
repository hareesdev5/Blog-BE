const express = require("express");
const blogController = require("../controller/blog.js");
const Auth = require('../common/auth.js')

const router = express.Router();

router.post("/create",Auth.validate,blogController.createBlog);
router.put("/edit/:id",Auth.validate,blogController.editBlogbyId);
router.get('/',Auth.validate,Auth.adminGuard,blogController.getAllBlogs)
router.get('/user',Auth.validate,blogController.getBlogByUserId)
router.put('/status/:id/:status',Auth.validate,Auth.adminGuard,blogController.updateBlogStatus)
router.get('/:id',Auth.validate,blogController.getBlogById)

module.exports = router;
