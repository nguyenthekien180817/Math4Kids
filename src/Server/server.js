const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const route = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
var session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "https://nguyenthekien180817.github.io/Math4Kids/",
    credentials: true,
  })
);

try {
  mongoose
    .connect(
      "mongodb+srv://khiembinhminh:kiengiang123@m4kdatabase.aa1prtv.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(console.log("Connected to the Database"));
} catch (error) {
  console.log("Fail to connect to Database");
}

app.use(
  session({
    secret: "180817",
    resave: false,
    saveUninitialized: false,
    cookie: {
      _expires: 3600000,
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://khiembinhminh:kiengiang123@m4kdatabase.aa1prtv.mongodb.net/?retryWrites=true&w=majority",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// app.use(cookieParser("180817"));

app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
