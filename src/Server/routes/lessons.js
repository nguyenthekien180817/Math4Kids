const express = require("express");
const router = express.Router();
const lessonsController = require("../controllers/LessonController");

router.get("/:slug", lessonsController.showPage);
router.get("/", lessonsController.show);
router.get("/create", lessonsController.create);
router.post("/store", lessonsController.store);
router.put("/:slug", lessonsController.update);
router.delete("/:slug", lessonsController.remove);

module.exports = router;
