const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const moment = require("moment-timezone");
const dateHanoi = moment.tz("Asia/Ho_Chi_Minh").format();

const EssayTests = new Schema({
  author: { type: String, default: "user01@test" },
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: dateHanoi },
  updatedAt: { type: Date, default: dateHanoi },
  slug: { type: String, slug: ["author", "name"] },
});

module.exports = mongoose.model("EssayTests", EssayTests);
