const router = require("express").Router();
const controller = require("../controllers/categoryController");
const { authenticate, authorize } = require("../middleware/auth");

router.get("/", controller.list);
router.post("/", authenticate, authorize("admin", "editor"), controller.create);
router.delete("/:id", authenticate, authorize("admin"), controller.remove);

module.exports = router;
