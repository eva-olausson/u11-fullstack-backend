require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const users = require("./routes/users");
const posts = require("./routes/posts");
const passport = require("passport");
const { clientOrigins, serverPort } = require("./config/env.dev");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: clientOrigins }));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/users", users);
app.use("/posts", posts);

app.get("/", (req, res) => {
  res.send("This is the landing page");
});

mongoose.connect(
  process.env.DATABASE_CONNECTION_STRING,
  { useNewUrlParser: true },
  () => {
    console.log("Connected to DB");
  }
);

app.listen(serverPort);
