const express = require("express");
const router = express.Router();
const accountController = require("../controllers/AccountController");

// localhost/account
router.post("/create", accountController.create);
router.get("/", accountController.getAccounts);
router.post("/validation", accountController.validation);
router.get("/get-user", accountController.getUser);
router.post("/:slug/signout", accountController.signout);
router.put("/:slug/update", accountController.update);
router.post("/:slug/store-finished", accountController.storeFinishedTest);
module.exports = router;
