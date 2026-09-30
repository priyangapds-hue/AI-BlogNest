const Blog = require("../models/Blog");
const { clean } = require("../utils/sanitize");

exports.create = async (req, res, next) => {
  try {
    const { name, message, photo, category, tags, status, scheduledAt } = req.body;

    const blog = await Blog.create({
      userID: req.user.id,
      name: clean(name),
      message: clean(message),
      photo: clean(photo || ""),
      category: category || null,
      tags: Array.isArray(tags) ? tags.map(clean) : [],
      status: status || "draft",
      scheduledAt: scheduledAt || null
    });

    res.status(201).json({ success: true, message: "Blog created", blog });
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const filter = { status: "published" };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.tag) filter.tags = req.query.tag;

    const blogs = await Blog.find(filter)
      .populate("userID", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: blogs.length, blogs });
  } catch (err) { next(err); }
};

exports.mine = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ userID: req.user.id })
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("userID", "name")
      .populate("category", "name");

    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.json({ success: true, blog });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    const owner = String(blog.userID) === String(req.user.id);
    const privileged = ["admin", "editor"].includes(req.user.role);
    if (!owner && !privileged) return res.status(403).json({ success: false, message: "Not allowed" });

    const allowed = ["name", "message", "photo", "category", "tags", "status", "scheduledAt"];
    allowed.forEach(key => {
      if (req.body[key] !== undefined) {
        blog[key] = key === "tags" && Array.isArray(req.body[key])
          ? req.body[key].map(clean)
          : typeof req.body[key] === "string" ? clean(req.body[key]) : req.body[key];
      }
    });

    await blog.save();
    res.json({ success: true, message: "Blog updated", blog });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    const owner = String(blog.userID) === String(req.user.id);
    const privileged = ["admin", "editor"].includes(req.user.role);
    if (!owner && !privileged) return res.status(403).json({ success: false, message: "Not allowed" });

    await blog.deleteOne();
    res.json({ success: true, message: "Blog deleted" });
  } catch (err) { next(err); }
};

exports.search = async (req, res, next) => {
  try {
    const q = clean(req.query.q || "");
    if (!q) return res.status(400).json({ success: false, message: "Search query is required" });

    const blogs = await Blog.find({
      status: "published",
      $or: [
        { name: { $regex: q, $options: "i" } },
        { message: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } }
      ]
    }).sort({ createdAt: -1 });

    res.json({ success: true, count: blogs.length, blogs });
  } catch (err) { next(err); }
};
