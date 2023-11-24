const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const moment = require("moment-timezone");
const dateHanoi = moment.tz("Asia/Ho_Chi_Minh").format();

const answerImageArray = new Schema({
  question: { type: [String] },
  answerA: { type: [String] },
  answerB: { type: [String] },
  answerC: { type: [String] },
  answerD: { type: [String] },
});

const FinishedMultiTest = new Schema({
  author: { type: String, required: true },
  test_name: { type: String, default: "Bài Test 01" },
  student_name: { type: String, required: true },
  student_email: { type: String, required: true },
  questionArray: { type: [String], default: undefined },
  answersArray: { type: [String], default: undefined },
  resultArray: { type: [String], default: undefined },
  score: { type: Number, required: true, default: 0 },
  test_id: { type: String, required: true },
  createdAt: { type: Date, default: dateHanoi },
  updatedAt: { type: Date, default: dateHanoi },
  imageArray: { type: { answerImageArray }, required: true, default: "" },
  answerImage: { type: [String], default: undefined },
});

module.exports = mongoose.model("FinishedMultiTest", FinishedMultiTest);
