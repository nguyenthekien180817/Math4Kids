const express = require("express");
const router = express.Router();
const EssayTestController = require("../controllers/EssayTestController");

//router /essay-test
router.get("/:slug/show-essay-test", EssayTestController.show);
router.post(
  "/:slug/store-finished-essay",
  EssayTestController.storeFinishedTest
);

module.exports = router;
