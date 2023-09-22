const FinishedTests = require("../model/EssayTest Model/FinishedEssayTest");
const EssayTests = require("../model/EssayTest Model/EssayTests");
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
