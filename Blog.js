const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true, maxlength: 200 },
  photo: { type: String, default: "" },
  message: { type: String, required: true },
  likes: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
  tags: [{ type: String, trim: true }],
  status: {
    type: String,
    enum: ["draft", "pending", "scheduled", "published"],
    default: "draft"
  },
  scheduledAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
