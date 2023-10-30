const Accounts = require("../model/Accounts");
const FinishedTests = require("../model/MultiChoiceTest Model/FinishedMultiTest");
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
            accountName: req.body.accountName,
            level: req.body.level,
          });
          account.save().then(res.send("Done"));
        } catch (err) {}
      }
    });
  }

  getUser(req, res) {
    res.json({
      email: req.user.email,
      accountName: req.user.accountName,
      level: req.user.level,
    });
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
      })
    );
  }

  update(req, res, next) {
    Accounts.updateOne({ email: req.params.slug }, req.body).then(
      res.send("Done")
    );
  }

  async storeFinishedTest(req, res, next) {
    try {
      let finishedTest = new FinishedTests(req.body);
      finishedTest.save().then(res.send("Done"));
    } catch (err) {}
  }

  async changePasswords(req, res, next) {
    Accounts.findOne({ email: req.params.account }, (err, result) => {
      const check = bcrypt.compare(result.password, req.body.oldPassword);
      if (check === true) {
        Accounts.updateOne(
          { email: req.body.email },
          req.body.newPassword
        ).then(res.send("Done"));
      } else {
        res.send("Wrong Password");
      }
    });
  }
}

module.exports = new AccountController();
