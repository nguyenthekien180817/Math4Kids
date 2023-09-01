const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const route = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
var session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

app.use(
  cors({
    origin: "http://localhost:3000/login",
    credentials: true,
  })
);

app.use(
  session({
    secret: "180817",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser("180817"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

try {
  mongoose.connect("mongodb://localhost:27017/Test");
  console.log("Connected to the Database");
} catch (error) {
  console.log("Fail to connect to Database");
}

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
