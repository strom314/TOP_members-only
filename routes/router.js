const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const validator = require("../middleware/validator");
const passport = require("passport");

router.get("/", controller.getIndex);

router.get("/sign-up", controller.getSignUp);
router.post("/sign-up", validator.validateSignUp, controller.postSignUp);

router.get("/log-in", controller.getLogIn);
router.post(
  "/log-in",
  validator.validateLogin,
  controller.postLogIn,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  }),
);

router.get("/log-out", controller.getLogOut);

router.get("/new-message", controller.getNewMessage);
router.post("/new-message", controller.postNewMessage);
router.get("/:messageId/delete", controller.getDeleteMessage);

router.get("/admin", controller.getAdmin);
router.post("/admin", controller.postAdmin);
module.exports = router;
