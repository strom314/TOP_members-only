const { body } = require("express-validator");
const validateSignUp = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .escape(),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .escape(),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .escape(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must contain at least 8 characters"),
  body("repeatPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  body("isAdmin").optional().toBoolean(),
];

module.exports = { validateSignUp };
