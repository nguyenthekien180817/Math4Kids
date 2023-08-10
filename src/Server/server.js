const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const route = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
