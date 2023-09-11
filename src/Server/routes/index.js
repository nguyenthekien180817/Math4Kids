const lessonRouter = require("./lessons");
const accountRouter = require("./account");
const multiTestRouter = require("./multiChoiceTest");

function route(app) {
  app.use("/ly-thuyet", lessonRouter);
  app.use("/account", accountRouter);
  app.use("/multi-test", multiTestRouter);
}

module.exports = route;
