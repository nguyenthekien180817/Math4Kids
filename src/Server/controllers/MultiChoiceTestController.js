const MultiTests = require("../model/MultiChoiceTest Model/MultiTests");
const FinishedTests = require("../model/MultiChoiceTest Model/FinishedMultiTest");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class MultiChoicePageController {
  store(req, res, next) {
    MultiTests.findOne(
      {
        name: req.body.name,
        author: req.body.author,
      },
      async function (err, done) {
        if (err) res.send(err);
        if (done) res.send("Already Have");
        if (!done) {
          try {
            let MultiTest = new MultiTests(req.body);
            MultiTest.save().then(res.send("Done"));
          } catch (err) {}
        }
      }
    );
  }

  async showAll(req, res, next) {
    try {
      MultiTests.find({ author: req.params.slug })
        .then((tests) => {
          res.json({ tests: multipleMongooseToObject(tests) });
        })
        .catch(next);
    } catch (err) {}
  }

  async showSpecificTest(req, res, next) {
    try {
      MultiTests.findOne({ _id: req.params.id }).then((response) => {
        res.json({
          tests: mongooseToObject(response),
        });
      });
    } catch (err) {
      res.send(err);
    }
  }

  async storeFinishedTest(req, res, next) {
    FinishedTests.findOne(
      {
        student_email: req.body.student_email,
      },
      async function (err, done) {
        if (err) res.send(err);
        if (done)
          res.send({
            message: "Already Done",
          });
        if (!done) {
          try {
            let finishedTest = new FinishedTests(req.body);
            finishedTest.save().then(
              res.send({
                message: "Done",
                detail: req.body.resultArray,
              })
            );
          } catch (err) {}
        }
      }
    );
  }

  async showAllStoredFinish(req, res, next) {
    FinishedTests.find({ test_id: req.params.id }, (err, results) => {
      if (err) throw err;
      if (results.length != 0) {
        if (results[0].author == req.params.slug) {
          res.json({ tests: multipleMongooseToObject(results) });
        } else {
          res.send("No access");
        }
      } else {
        res.send("No Data");
      }
    });
  }
}

module.exports = new MultiChoicePageController();
