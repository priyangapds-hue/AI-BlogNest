const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postID: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true, trim: true, maxlength: 1000 },
  status: {
    type: String,
    enum: ["pending", "approved", "spam"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
