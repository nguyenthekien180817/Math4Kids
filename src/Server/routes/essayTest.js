const express = require("express");
const router = express.Router();
const EssayTestController = require("../controllers/EssayTestController");

//router /essay-test
router.get("/:slug/show-essay-test", EssayTestController.show);
router.get("/show-detail/:id", EssayTestController.showIndividual);
router.post("/:email/store", EssayTestController.store);

router.get(
  "/:slug/store-finished-essay/:id/detail",
  EssayTestController.showAllStoredFinish
);

router.put("/:teacher/:id/update", EssayTestController.updateEssayTest);

router.post(
  "/:slug/store-finished-essay",
  EssayTestController.storeFinishedTest
);

router.get(
  "/:teacher/list-finished-essay/:student",
  EssayTestController.listedStudentTest
);

router.put(
  "/:teacher/list-finished-essay/:id/update",
  EssayTestController.updateSubmittedTest
);

module.exports = router;
