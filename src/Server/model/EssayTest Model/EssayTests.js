const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const EssayTests = new Schema({
  author: { type: String, default: "user01@test" },
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  slug: { type: String, slug: ["author", "name"] },
});

module.exports = mongoose.model("EssayTests", EssayTests);
