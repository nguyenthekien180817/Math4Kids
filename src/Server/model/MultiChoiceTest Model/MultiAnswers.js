const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const MultiQuestions = new Schema({
  author: { type: String, required: true, default: "user01@test" },
  question_name: { type: String, required: true },
  correctAnswer: { type: String },
  id: { type: String, slug: ["author", "question_name"] },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("MultiQuestions", MultiQuestions);
