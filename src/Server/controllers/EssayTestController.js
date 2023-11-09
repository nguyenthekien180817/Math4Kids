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
    EssayTests.find({ author: req.params.author })
      .then((tests) => {
        res.json({ tests: multipleMongooseToObject(tests) });
      })
      .catch(next);
  }

  showIndividual(req, res, next) {
    try {
      EssayTests.findOne({ _id: req.params.id }, (err, result) => {
        if (err) res.send(err);
        if (result) {
          res.json({ result });
        }
      });
    } catch (err) {
      res.send(err)({ result });
    }
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
        test_name: req.body.test_name,
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

  //[GET] trả về tất cả các test học sinh đã nộp từ 1 bài thi này
  async showAllStoredFinish(req, res, next) {
    FinishedTests.find({ test_id: req.params.id }, (err, results) => {
      if (err) throw err;
      if (results.length != 0) {
        if (results[0].author == req.params.author) {
          res.send(results);
        } else {
          res.send("No access");
        }
      } else {
        res.send([]);
      }
    });
  }

  async showAllStudentSubmissions(req, res, next) {
    FinishedTests.find(
      { student_email: req.params.student },
      (err, results) => {
        if (err) throw err;
        if (results.length != 0) {
          res.send(results);
        } else {
          res.send([]);
        }
      }
    );
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

  async updateSubmittedTest(req, res, next) {
    FinishedTests.updateOne(
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

  async updateEssayTest(req, res, next) {
    EssayTests.updateOne(
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

  async deleteTest(req, res, next) {
    if (req.params.level == "admin" || req.params.level == "teacher") {
      EssayTests.deleteOne({ _id: req.params.id })
        .then(res.send("Done"))
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.send("Not An Admin");
    }
  }
}

module.exports = new EssayTestController();
