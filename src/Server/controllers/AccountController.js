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
    if (req.body.value != "") {
      let regex = new RegExp(req.body.value, "i");
      req.params.level == "admin"
        ? Accounts.find({
            email: regex,
          })
            .then((accounts) => {
              res.send(accounts);
            })
            .catch(next)
        : res.send("No Access");
    } else {
      req.params.level == "admin"
        ? Accounts.find({})
            .then((accounts) => {
              res.send(accounts);
            })
            .catch(next)
        : res.send("No Access");
    }
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
    // Accounts.findOne({ _id: req.session.passport.user }, (err, account) => {
    //   if (err) res.send(err);
    //   if (account) res.send(account);
    // });
    // res.json({
    //   id: req.sessionID,
    //   email: req.user.email,
    //   accountName: req.user.accountName,
    //   level: req.session.user.level,
    // });
    if (req.session.passport && req.session.passport.user) {
      res.json({
        id: req.user.id,
        email: req.user.email,
        accountName: req.user.accountName,
        level: req.session.user.level,
      });
    }
  }

  validation(req, res, next) {
    let { email, password } = req.body;
    passport.authenticate("local", (err, account, info) => {
      if (err) throw err;
      if (!account) {
        res.send("Tài khoản không đúng");
      } else {
        req.login(account, info, (err) => {
          if (err) throw err;
          let level = req.user.level;
          let message = "Done";
          let userId = req.session.passport.user;
          req.session.user = { email, level, message, userId };
          console.log(req.session);
          return res.send(req.session);
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
    Accounts.updateOne({ email: req.params.email }, req.body).then(
      res.send("Done")
    );
  }

  async updateForAdmin(req, res, next) {
    if (req.params.level != "admin") {
      res.send("No Access");
    } else {
      switch (req.params.type) {
        case "level":
          Accounts.updateOne(
            { email: req.params.email },
            { $set: { level: req.body.level } }
          ).then(res.send("Done"));
          break;

        case "password":
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          Accounts.updateOne(
            { email: req.params.email },
            { $set: { password: hashedPassword } }
          ).then(res.send("Done"));
          break;
      }
    }
  }

  async deleteAccount(req, res, next) {
    try {
      if (req.params.level == "admin") {
        Accounts.deleteOne({ email: req.body.email }, (err, result) => {
          if (err) res.send(err);
          if (result) res.send("Done");
        });
      } else {
        res.send("No Access");
      }
    } catch (err) {}
  }

  async storeFinishedTest(req, res, next) {
    try {
      let finishedTest = new FinishedTests(req.body);
      finishedTest.save().then(res.send("Done"));
    } catch (err) {}
  }

  async changePasswords(req, res, next) {
    Accounts.findOne({ email: req.params.account }, (err, result) => {
      bcrypt.compare(
        req.body.oldPassword,
        result.password,
        async (err, result) => {
          if (result === true) {
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            Accounts.updateOne(
              { email: req.params.account },
              { $set: { password: hashedPassword } }
            ).then(res.send("Done"));
          }
          if (result === false) {
            res.send("Sai Mat Khau");
          }
        }
      );

      // res.send(result.password);
    });
  }
}

module.exports = new AccountController();
