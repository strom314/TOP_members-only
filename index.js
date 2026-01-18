require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const populateDb = require("./db/populateDb");
const router = require("./routes/router");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

populateDb();

app.use("/", router);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.log("server started on port: " + PORT);
});
