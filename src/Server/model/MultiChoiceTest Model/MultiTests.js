const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const MultiTests = new Schema({
  author: { type: String, default: "user01@test" },
  name: { type: String, required: true },
  description: { type: String },
  question: { type: [String], required: true, default: "" },
  answerAArray: { type: [String], required: true, default: "" },
  answerBArray: { type: [String], required: true, default: "" },
  answerCArray: { type: [String], required: true, default: "" },
  answerDArray: { type: [String], required: true, default: "" },
  correctAnswerArray: { type: [String], required: true, default: "" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  slug: { type: String, slug: ["author", "name"] },
});

module.exports = mongoose.model("MultiTests", MultiTests);