const lessonRouter = require("./lessons");
const accountRouter = require("./account");
const multiTestRouter = require("./multiChoiceTest");
const essayTestRouter = require("./essayTest");

function route(app) {
  app.use("/ly-thuyet", lessonRouter);
  app.use("/account", accountRouter);
  app.use("/multi-test", multiTestRouter);
  app.use("/essay-test", essayTestRouter);
}

module.exports = route;
