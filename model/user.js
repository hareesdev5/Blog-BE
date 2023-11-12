const mongoose = require('./index')

const validateEmail = (e) => {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(e);
};

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "FirstName is required"] },
    lastName: { type: String, required: [true, "LastName is required"] },
    email: {
      type: String,
      required: [true, "email is required"],
      validate: validateEmail,
    },
    Password: { type: String, required: [true, "Password is required"] },
    status: { type: Boolean, default: true },
    role: { type: String, default: "user" },
    createAt: { type: Date, default: Date.now() },
  },
  {
    collection: "user",
    versionKey: false,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel