const { body } = require("express-validator");
const db = require("../db/query");

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
    .custom(async (value) => {
      const existingUsername = await db.findUserByUsername(value);
      if (existingUsername) {
        throw new Error("This username already exsits");
      }
      return true;
    })
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

const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ max: 50 })
    .withMessage("username cannot be over 50 characters"),
  body("password").trim().notEmpty().withMessage("password is required"),
];
module.exports = { validateSignUp, validateLogin };
