const express = require("express");
const router = express.Router();
const TextBookController = require("../controllers/TextBookController");

//Route textbook

router.get("/", TextBookController.show);
router.post("/:level/store", TextBookController.store);

module.exports = router;
