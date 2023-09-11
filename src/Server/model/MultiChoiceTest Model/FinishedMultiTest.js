const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const FinishedMultiTest = new Schema({
  author: { type: String, required: true, default: "user01@test" },
  test_name: { type: String, required: true },
  student_name: { type: String, required: true },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("FinishedMultiTest", FinishedMultiTest);
