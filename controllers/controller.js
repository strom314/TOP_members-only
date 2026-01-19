const db = require("../db/query");
const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

async function getIndex(req, res) {
  const messages = await db.getAllMessages();

  //hide usernames if user is not logged in
  if (!req.user) {
    messages.forEach((message) => {
      message["user"] = "Anonymous";
    });
  } else {
    for (const message of messages) {
      const user = await db.findUserById(message.user_id);
      message["user"] = user.username;
    }
  }
  res.render("index", { messages: messages });
}
function getSignUp(req, res) {
  res.render("sign-up");
}
async function postSignUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", {
      errors: errors.array(),
      prevInput: req.body,
    });
  }
  const data = matchedData(req);
  const hashedPassword = await bcrypt.hash(data.password, 10);
  await db.addUser(
    data.firstName,
    data.lastName,
    data.username,
    hashedPassword,
  );
  res.redirect("/log-in");
}

function getLogIn(req, res) {
  res.render("log-in");
}

function postLogIn(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("log-in", {
      errors: errors.array(),
    });
  }
  next();
}

function getLogOut(req, res, next) {
  req.logout((error) => {
    if (error) {
      next(error);
    }
  });
  res.redirect("/");
}

function getNewMessage(req, res) {
  res.render("new-message");
}
async function postNewMessage(req, res) {
  await db.addMessage(req.user.id, req.body.title, req.body.text);
  res.redirect("/");
}

function getAdmin(req, res) {
  res.render("admin");
}

async function postAdmin(req, res) {
  if (req.body.passcode === process.env.ADMIN_PASSCODE) {
    db.setAdmin(req.user.id);
  }
  res.redirect("/");
}

async function getDeleteMessage(req, res) {
  if (req.user.admin) {
    await db.deleteMessage(req.params.messageId);
    res.redirect("/");
  }
}

function checkAuthentificated(req, res, next) {
  if (req.isAuthentificated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = {
  getIndex,
  getSignUp,
  postSignUp,
  getLogIn,
  postLogIn,
  getLogOut,
  getNewMessage,
  postNewMessage,
  getAdmin,
  postAdmin,
  getDeleteMessage,
  checkAuthentificated,
};
