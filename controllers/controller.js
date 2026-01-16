const db = require("../db/query");
const { validationResult, matchedData } = require("express-validator");

function getIndex(req, res) {
  res.render("index");
}
function getSignUp(req, res) {
  res.render("sign-up");
}
async function postSignUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", { errors: errors.array() });
  }
  const data = matchedData(req);
  console.log(data);

  await db.addUser(
    data.firstName,
    data.lastName,
    data.username,
    data.password,
    data.isAdmin
  );
  res.redirect("/login");
}

module.exports = { getIndex, getSignUp, postSignUp };
