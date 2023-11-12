const blogModel = require("../model/blog.js");
const { Status } = require("../common/utlis.js");

const createBlog = async (req, res) => {
  try {
    let filter = await blogModel.findOne({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      describtion: req.body.describtion,
    });
    if (!filter) {
      let { title, imageUrl, describtion } = req.body;
      if (title && imageUrl && describtion) {
        await blogModel.create({
          title,
          imageUrl,
          describtion,
          createdBy: req.headers.userId,
        });
        res.status(201).send({
          message: "Blog created ,Waiting for approval",
        });
      } else {
        res.status(400).send({
          message: "title , imageUrl, describtion is required",
        });
      }
    } else {
      res.status(400).send({
        message: "Blog already Created",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

const editBlogbyId = async (req, res) => {
  try {
    let blogId = req.params.id;
    if (blogId) {
      let { title, imageUrl, describtion } = req.body;
      let blog = await blogModel.findById(blogId);

      (blog.title = title),
        (blog.imageUrl = imageUrl),
        (blog.describtion = describtion);
        (blog.status = Status.PENDING)

      await blog.save();
      res.status(200).send({
        message: "Blog Edited Successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    let data = await blogModel
      .find({}, { discribtion: 0, createdBy: 0, reason: 0 })
      .sort({ createAt: 1 });
    res.status(200).send({
      message: "Data Fetched Successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getBlogByUserId = async (req, res) => {
  try {
    let data = await blogModel
      .find(
        { createdBy: req.headers.userId },
        { discribtion: 0, createdBy: 0, reason: 0 }
      )
      .sort({ createAt: 1 });
    res.status(200).send({
      message: "Data Fetched Successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateBlogStatus = async (req, res) => {
  try {
    let blogId = req.params.id;
    let status = req.params.status;
    if (blogId && status) {
      let { reason } = req.body;
      let blog = await blogModel.findById(blogId);
      if (status === Status.APPROVED) {
        blog.status = Status.APPROVED;
        blog.approvedBy = req.headers.id;
        blog.reason = "";
      } else if (status === Status.REJECTED) {
        blog.status = Status.REJECTED;
        blog.reason = reason;
        blog.rejectedBy = req.headers.id;
      } else {
        blog.status = Status.PENDING;
      }
      await blog.save();
      res.status(200).send({
        message: "Blog Edited Successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    let blogId = req.params.id;
    if (blogId) {
      let blog = await blogModel.findById(req.params.id);
      res.status(200).send({
        message: "Blog Fetched Successfully",
        blog,
      });
    } else {
      res.status(400).send({
        message: "Invalid Blog Id",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createBlog,
  editBlogbyId,
  getAllBlogs,
  getBlogById,
  getBlogByUserId,
  updateBlogStatus,
};
