const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Accounts = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  thumbnail: {
    type: String,
    default: "https://media.gametora.com/umamusume/characters/profile/1032.png",
  },
  userName: { type: String, slug: "email", unique: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Accounts", Accounts);
