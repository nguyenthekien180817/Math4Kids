const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const FinishedEssayTest = new Schema({
  author: { type: String, required: true, default: "Anonymous" },
  test_name: { type: String, default: "Bài Test Tự Luận 01" },
  student_name: { type: String, required: true, default: "Anonymous" },
  student_email: { type: String, required: true, default: "Anonymous" },
  questionArray: { type: [String], default: undefined },
  answersArray: { type: [String], default: undefined },
  scoreArray: { type: [Number], required: true, default: 0 },
  noteArray: { type: [String], required: true, default: "Không có ghi chú" },
  totalScore: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("FinishedEssayTest", FinishedEssayTest);
