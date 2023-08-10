const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Course = new Schema({
  name: { type: String },
  description: { type: String },
  thumbnail: {
    type: String,
    default: "https://media.gametora.com/umamusume/characters/profile/1032.png",
  },
  slug: { type: String, slug: "name", unique: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Course", Course);
