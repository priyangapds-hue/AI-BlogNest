const router = require("express").Router();
const controller = require("../controllers/aiController");
const { authenticate, authorize } = require("../middleware/auth");

router.post("/generate-blog", authenticate, authorize("admin", "editor", "author"), controller.generateBlog);
router.post("/summarize", authenticate, authorize("admin", "editor", "author"), controller.summarize);

module.exports = router;
