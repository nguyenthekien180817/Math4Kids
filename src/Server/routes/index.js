const lessonRouter = require("./lessons");

function route(app) {
  app.use("/ly-thuyet", lessonRouter);
}

module.exports = route;
