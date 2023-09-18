const MultiTests = require("../model/MultiChoiceTest Model/MultiTests");
const FinishedTests = require("../model/MultiChoiceTest Model/FinishedMultiTest");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");
class MultiChoicePageController {
  store(req, res, next) {
    let MultiTest = new MultiTests(req.body);
    MultiTest.save().then(res.send(req.body));
  }
  show(req, res, next) {
    MultiTests.find({ author: req.params.slug })
      .then((tests) => {
        res.json({ tests: multipleMongooseToObject(tests) });
      })
      .catch(next);
  }

  async storeFinishedTest(req, res, next) {
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

    // if (check != null) {
    //   res.send("Thí sinh đã làm bài thi từ trước");
    // } else {
    //   let finishedTest = new FinishedTests(req.body);
    //   finishedTest.save().then(res.send("Done"));
    // }
  }
}

module.exports = new MultiChoicePageController();
