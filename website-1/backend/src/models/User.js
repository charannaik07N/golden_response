const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    profileImage: { type: String },
    phoneNumber: { type: String },
    googleId: { type: String, index: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
