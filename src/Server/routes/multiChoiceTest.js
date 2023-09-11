const express = require("express");
const router = express.Router();
const MultiChoiceTestController = require("../controllers/MultiChoiceTestController");

/* multi-test Route */

router.post("/:slug/store", MultiChoiceTestController.store);
router.get("/show-multi-test", MultiChoiceTestController.show);
module.exports = router;
