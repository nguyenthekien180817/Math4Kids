const textBooks = require("../model/TextBookInfo");

class TextBookController {
  async show(req, res, next) {
    textBooks.find({}).then((data) => {
      res.send(data);
    });
  }

  async showOne(req, res, next) {
    textBooks.find({ slug: req.params.slug }, (err, data) => {
      if (err) res.send(err);
      if (data) res.send(data);
    });
  }

  async store(req, res, next) {
    textBooks.findOne(
      {
        name: req.body.name,
      },
      async function (err, done) {
        if (err) res.send(err);
        if (done) res.send("Already Have");
        if (!done) {
          if (req.params.level == "admin") {
            try {
              let textBook = new textBooks(req.body);
              textBook.save().then(res.send("Done"));
            } catch (err) {}
          } else {
            res.send("Not An Admin");
          }
        }
      }
    );
  }

  async deleteBook(req, res, next) {
    req.params.level = "admin"
      ? textBooks.deleteOne({ slug: req.params.slug }).then(res.send("Done"))
      : res.send("Not An Admin");
  }
}

module.exports = new TextBookController();
