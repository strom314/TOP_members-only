const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/query");

const passportStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await db.findUserByUsername(username);

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    const match = bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.findUserById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passportStrategy;
