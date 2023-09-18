const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const stringElement = new Schema({
  data: { type: String },
});

const FinishedMultiTest = new Schema({
  author: { type: String, required: true, default: "Anonymous" },
  test_name: { type: String, default: "Bài Test 01" },
  student_name: { type: String, required: true, default: "Anonymous" },
  student_email: { type: String, required: true, default: "Anonymous" },
  questionArray: { type: [String], default: undefined },
  answersArray: { type: [String], default: undefined },
  resultArray: { type: [String], default: undefined },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("FinishedMultiTest", FinishedMultiTest);
