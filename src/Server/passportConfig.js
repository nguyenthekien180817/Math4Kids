const Accounts = require("./model/Accounts");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        Accounts.findOne({ email: email }, async (err, account) => {
          if (err) throw err;
          if (!account) return done(null, false);
          bcrypt.compare(password, account.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, account);
            } else {
              return done(null, false);
            }
          });
        });
      }
    )
  );

  passport.serializeUser((user, cb) => {
    return cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    return Accounts.findOne({ _id: id }, (err, account) => {
      cb(err, account);
    });
  });
};
