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

const MultiTests = new Schema({
  author: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  question: { type: [String], required: true, default: "" },
  answerAArray: { type: [String], required: true, default: "" },
  answerBArray: { type: [String], required: true, default: "" },
  answerCArray: { type: [String], required: true, default: "" },
  answerDArray: { type: [String], required: true, default: "" },
  imageArray: { type: { answerImageArray }, required: true, default: "" },
  correctAnswerArray: { type: [String], required: true, default: "" },
  createdAt: { type: Date, default: dateHanoi },
  updatedAt: { type: Date, default: dateHanoi },
  slug: { type: String, slug: ["author", "name"] },
});

module.exports = mongoose.model("MultiTests", MultiTests);
