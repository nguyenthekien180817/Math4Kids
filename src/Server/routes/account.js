const express = require("express");
const router = express.Router();
const accountController = require("../controllers/AccountController");

router.post("/create", accountController.create);
router.get("/", accountController.getAccounts);
router.post("/:slug/multi-test", accountController.getMultiTest);
router.post("/validation", accountController.validation);
router.get("/get-user", accountController.getUser);
router.post("/signout", accountController.signout);
module.exports = router;
