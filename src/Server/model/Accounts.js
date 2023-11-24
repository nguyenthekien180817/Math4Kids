const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
const dateHanoi = moment.tz(Date.now(), "Asia/Ho_Chi_Minh");
var slug = require("mongoose-slug-generator");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.plugin(slug);

const Accounts = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  accountName: { type: String, required: true },
  level: { type: String, required: true },
  userName: { type: String, slug: "email", unique: true },
  createdAt: { type: Date, default: dateHanoi },
  updatedAt: { type: Date, default: dateHanoi },
});

Accounts.plugin(passportLocalMongoose);

module.exports = mongoose.model("Accounts", Accounts);
