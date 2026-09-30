const router = require("express").Router();
const controller = require("../controllers/blogController");
const { authenticate, authorize } = require("../middleware/auth");

router.get("/", controller.list);
router.get("/search", controller.search);
router.get("/mine", authenticate, controller.mine);
router.get("/:id", controller.getOne);

router.post("/", authenticate, authorize("admin", "editor", "author"), controller.create);
router.put("/:id", authenticate, authorize("admin", "editor", "author"), controller.update);
router.delete("/:id", authenticate, authorize("admin", "editor", "author"), controller.remove);

module.exports = router;
