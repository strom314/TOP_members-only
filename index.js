require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const populateDb = require("./db/populateDb");
const router = require("./routes/router");
const passportStrategy = require("./config/passportConfig");
const passport = require("passport");
const sessionConfig = require("./config/sessionConfig");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

passport.use(passportStrategy);
app.use(sessionConfig);
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// populateDb();

app.use("/", router);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.log("server started on port: " + PORT);
});
