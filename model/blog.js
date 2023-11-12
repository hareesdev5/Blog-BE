const mongoose = require("./index");
const {Status} = require('../common/utlis')

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"] },
    imageUrl: { type: String, required: [true, "ImageUrl is required"] },
    describtion: { type: String, required: [true, "Describtion is required"] },
    status: { type: String, default: Status.PENDING },
    createdBy: { type: String, required: [true, "CreatedBy is required"] },
    approvedBy: { type: String },
    modifiedAt: { type: Date },
    rejectedBy: { type: String },
    reason: { type: String, default: "" },
    createAt: { type: Date, default: Date.now() },
  },
  {
    collection: "blog",
    versionKey: false,
  }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
