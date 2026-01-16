const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const validator = require("../middleware/validator");

router.get("/", controller.getIndex);
router.get("/sign-up", controller.getSignUp);
router.post("/sign-up", validator.validateSignUp, controller.postSignUp);

module.exports = router;
