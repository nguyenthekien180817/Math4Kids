const express = require("express");
const router = express.Router();
const accountController = require("../controllers/AccountController");

router.post("/create", accountController.create);
router.get("/", accountController.getAccounts);
router.post("/validation", accountController.validation);
module.exports = router;
