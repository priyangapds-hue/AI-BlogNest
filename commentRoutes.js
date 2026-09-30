const router = require("express").Router();
const controller = require("../controllers/commentController");
const { authenticate, authorize } = require("../middleware/auth");

router.get("/post/:postId", controller.listForPost);
router.post("/", authenticate, controller.create);
router.patch("/:id/moderate", authenticate, authorize("admin", "editor"), controller.moderate);

module.exports = router;
