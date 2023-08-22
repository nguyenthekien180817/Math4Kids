const Accounts = require("../model/Accounts");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class AccountController {
  getAccounts(req, res, next) {
    Accounts.find({})
      .then((accounts) => {
        res.json({ accounts: multipleMongooseToObject(accounts) });
      })
      .catch(next);
  }

  async create(req, res, next) {
    try {
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      let account = new Accounts({
        email: req.body.email,
        password: hashedPassword,
      });
      account.save().then(res.redirect("http://localhost:3000/"));
    } catch (err) {}
  }

  async validation(req, res, next) {
    await Accounts.findOne({
      email: req.body.email,
      password: req.body.password,
    })
      .then((account) => {
        res.json(account.email);
      })
      .catch((err) => res.json("Error"));
  }
}

module.exports = new AccountController();
