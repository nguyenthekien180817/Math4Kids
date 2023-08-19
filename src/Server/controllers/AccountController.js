const Account = require("../model/Accounts");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class AccountController {
  getAccounts(req, res, next) {
    Courses.find({})
      .then((accounts) => {
        res.json({ accounts: multipleMongooseToObject(accounts) });
      })
      .catch(next);
  }

  create(req, res, next) {
    let account = new Account(req.body);
    console.log(account);
    account.save().then(res.redirect("http://localhost:3000/"));
    // ;
  }
}

module.exports = new AccountController();
