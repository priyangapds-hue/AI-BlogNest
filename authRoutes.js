const router = require("express").Router();
const { body } = require("express-validator");
const controller = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");
const validate = require("../middleware/validate");

router.post("/register", [
  body("name").trim().notEmpty(),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 })
], validate, controller.register);

router.post("/login", [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty()
], validate, controller.login);

router.get("/me", authenticate, controller.me);

module.exports = router;
