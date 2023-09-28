const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
const dateHanoi = moment.tz(Date.now(), "Asia/Ho_Chi_Minh");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Accounts = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  accountName: { type: String },
  level: { type: String, default: "student" },
  thumbnail: {
    type: String,
    default: "https://media.gametora.com/umamusume/characters/profile/1032.png",
  },
  userName: { type: String, slug: "email", unique: true },
  createdAt: { type: Date, default: dateHanoi },
  updatedAt: { type: Date, default: dateHanoi },
});

module.exports = mongoose.model("Accounts", Accounts);
