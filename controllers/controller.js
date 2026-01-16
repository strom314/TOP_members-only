function getIndex(req, res) {
  res.render("index");
}
function getSignUp(req, res) {
  res.render("sign-up");
}
function postSignUp(req, res) {}

module.exports = { getIndex, getSignUp, postSignUp };
