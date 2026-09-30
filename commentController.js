const Comment = require("../models/Comment");

exports.create = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      postID: req.body.postID,
      userID: req.user.id,
      text: req.body.text
    });
    res.status(201).json({ success: true, message: "Comment submitted for moderation", comment });
  } catch (err) { next(err); }
};

exports.listForPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      postID: req.params.postId,
      status: "approved"
    }).populate("userID", "name").sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (err) { next(err); }
};

exports.moderate = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });
    res.json({ success: true, message: "Comment moderated", comment });
  } catch (err) { next(err); }
};
