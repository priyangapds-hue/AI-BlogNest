const Category = require("../models/Category");

exports.list = async (req, res, next) => {
  try {
    res.json({ success: true, categories: await Category.find().sort({ name: 1 }) });
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, category });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({ success: true, message: "Category deleted" });
  } catch (err) { next(err); }
};
