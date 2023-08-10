const Courses = require("../model/Courses");
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../util/mongoose");

class LessonController {
  show(req, res, next) {
    Courses.find({})
      .then((courses) => {
        res.json({ lessons: multipleMongooseToObject(courses) });
      })
      .catch(next);
  }

  //[GET] show a specific course
  showPage(req, res, next) {
    Courses.findOne({ slug: req.params.slug })
      .then((course) => {
        res.json({
          course: mongooseToObject(course),
        });
      })
      .catch();
  }

  create(req, res, next) {
    res.json(req.body);
  }

  store(req, res, next) {
    console.log(req.body);
    let course = new Courses(req.body);
    console.log(course);
    course.save().then(res.redirect("http://localhost:3000/ly-thuyet"));
  }

  update(req, res, next) {
    Courses.updateOne({ slug: req.params.slug }, req.body).then(
      res.redirect("http://localhost:3000/ly-thuyet")
    );
  }

  remove(req, res, next) {
    Courses.deleteOne({ slug: req.params.slug }).then(
      res.redirect("http://localhost:3000/ly-thuyet")
    );
  }
}

module.exports = new LessonController();
