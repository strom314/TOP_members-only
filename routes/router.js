const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.getIndex);
router.get("/sign-up", controller.getSignUp);
router.post("/sign-up", controller.postSignUp);

module.exports = router;
