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
      MultiTests.find({ author: req.params.slug }, (err, result) => {
        if (err) res.send(err);
        if (result) {
          res.json({ tests: multipleMongooseToObject(result) });
        }
      });
    } catch (err) {}
  }

  async showSpecificTest(req, res, next) {
    try {
      MultiTests.findOne({ _id: req.params.id }, (err, result) => {
        if (err) res.send(err);
        if (result) {
          res.json({
            tests: mongooseToObject(result),
          });
        }
      });
    } catch (err) {
      res.send(err);
    }
  }

  async storeFinishedTest(req, res, next) {
    FinishedTests.findOne(
      {
        student_email: req.body.student_email,
        test_name: req.body.test_name,
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
          res.send(results);
        } else {
          res.send("No access");
        }
      } else {
        res.send([]);
      }
    });
  }

  async listedStudentTest(req, res, next) {
    FinishedTests.find(
      { student_email: req.params.student, author: req.params.teacher },
      (err, results) => {
        if (err) throw err;
        if (results.length != 0) {
          if (results[0].author == req.params.teacher) {
            res.send(results);
          } else {
            res.send("No access");
          }
        } else {
          res.send([]);
        }
      }
    );
  }

  async updateTest(req, res, next) {
    MultiTests.updateOne(
      { author: req.params.teacher, _id: req.params.id },
      req.body
    )
      .then(() => {
        res.send("Done");
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
}

module.exports = new MultiChoicePageController();
