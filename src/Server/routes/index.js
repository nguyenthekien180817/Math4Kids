const lessonRouter = require("./lessons");
const accountRouter = require("./account");

function route(app) {
  app.use("/ly-thuyet", lessonRouter);
  app.use("/account", accountRouter);
}

module.exports = route;
