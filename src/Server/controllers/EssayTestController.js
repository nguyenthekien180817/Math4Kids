const FinishedTests = require("../model/EssayTest Model/FinishedEssayTest");
const EssayTests = require("../model/EssayTest Model/EssayTests");
const Accounts = require("../model/Accounts");
const User = require;
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class EssayTestController {
  show(req, res, next) {
    EssayTests.find({ author: req.params.slug })
      .then((tests) => {
        res.json({ tests: multipleMongooseToObject(tests) });
      })
      .catch(next);
  }

  store(req, res, next) {
    Accounts.findOne({ email: req.params.email }, async function (err, done) {
      if (err) res.send("NoAcc");
      if (done) {
        EssayTests.findOne(
          {
            name: req.body.name,
            author: req.body.author,
          },
          async function (err, done) {
            if (err) res.send(err);
            if (done) res.send("Already Have");
            if (!done) {
              try {
                let EssayTest = new EssayTests(req.body);
                EssayTest.save().then(res.send("Done"));
              } catch (err) {}
            }
          }
        );
      }
    });
  }

  storeFinishedTest(req, res, next) {
    FinishedTests.findOne(
      {
        student_email: req.body.student_email,
      },
      async function (err, done) {
        if (err) res.send(err);
        if (done) res.send("Already Done");
        if (!done) {
          try {
            let finishedTest = new FinishedTests(req.body);
            finishedTest.save().then(res.send("Done"));
          } catch (err) {}
        }
      }
    );
  }
}

module.exports = new EssayTestController();
