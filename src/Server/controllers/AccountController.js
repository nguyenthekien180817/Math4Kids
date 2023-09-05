const Accounts = require("../model/Accounts");
const bcrypt = require("bcrypt");
const passport = require("passport");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("../passportConfig");

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
    Accounts.findOne({ email: req.body.email }, async function (err, account) {
      if (err) throw err;
      if (account) {
        res.send("Email này đã có người sử dụng!");
        next();
      }
      if (!account) {
        try {
          let hashedPassword = await bcrypt.hash(req.body.password, 10);
          let account = new Accounts({
            email: req.body.email,
            password: hashedPassword,
          });
          account.save().then(res.send("Done"));
        } catch (err) {}
      }
    });
  }

  getUser(req, res) {
    res.json(req.user.email);
  }

  validation(req, res, next) {
    passport.authenticate("local", (err, account, info) => {
      if (err) throw err;
      if (!account) {
        res.send("Tài khoản không đúng");
      } else {
        req.login(account, info, (err) => {
          if (err) throw err;
          return res.send("Done");
        });
      }
    })(req, res, next);
  }

  signout(req, res, next) {
    req.logout(
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        return res.send("Done");
      })
    );
  }

  getMultiTest(req, res, next) {
    res.send(req.body);
  }
}

module.exports = new AccountController();
