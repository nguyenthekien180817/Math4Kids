const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const MultiTests = new Schema({
  author: { type: String, required: true, default: "user01@test" },
  name: { type: String, required: true },
  description: { type: String },
  id: { type: String, slug: ["author", "name"] },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  slug: { type: String, slug: ["author", "name"] },
});

module.exports = mongoose.model("MultiTests", MultiTests);
