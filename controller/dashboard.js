const blogModel = require('../model/blog')
const {Status} = require('../common/utlis')

const getAllBlogs = async (req, res) => {
  try {
    let data = (await blogModel .find({status:Status.APPROVED}, { createdBy: 0, reason: 0 })).reverse();
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

module.exports = {
  getAllBlogs,
};
