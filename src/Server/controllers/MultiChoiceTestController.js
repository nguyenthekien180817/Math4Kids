const MultiTests = require("../model/MultiChoiceTest Model/MultiTests");
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
    MultiTests.find({})
      .then((tests) => {
        res.json({ tests: multipleMongooseToObject(tests) });
      })
      .catch(next);
  }
}

module.exports = new MultiChoicePageController();
