const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const MultiQuestions = new Schema({
  author: { type: String, required: true, default: "user01@test" },
  questions: { type: String },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("MultiQuestions", MultiQuestions);
