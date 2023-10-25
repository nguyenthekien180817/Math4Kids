const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Textbook = new Schema({
  name: { type: String },
  lessons: { type: [String], required: true },
  pageNumber: { type: [Number], required: true },
  slug: { type: String, slug: "name", unique: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Textbook", Textbook);
