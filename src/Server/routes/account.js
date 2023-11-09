const express = require("express");
const router = express.Router();
const accountController = require("../controllers/AccountController");

// localhost/account
router.post("/create", accountController.create);
router.post("/:level/get-all-accounts", accountController.getAccounts);
router.post("/validation", accountController.validation);
router.get("/get-user", accountController.getUser);
router.put("/:account/update-password", accountController.changePasswords);
router.post("/:account/signout", accountController.signout);
router.put("/:email/update", accountController.update);
router.put(
  "/:level/:email/:type/adminUpdate",
  accountController.updateForAdmin
);
router.delete("/:level/adminDelete", accountController.deleteAccount);
router.post("/:slug/store-finished", accountController.storeFinishedTest);
module.exports = router;
