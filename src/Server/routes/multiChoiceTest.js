const express = require("express");
const router = express.Router();
const MultiChoiceTestController = require("../controllers/MultiChoiceTestController");

/* multi-test Route */
//[get] trả về các test có người đăng là slug
router.get("/:slug/show-multi-test", MultiChoiceTestController.showAll);

//[post] lưu bài thi trắc nghiệm được đăng bởi giáo viên
router.post("/:slug/store", MultiChoiceTestController.store);

//[post] lưu bài thi của học sinh
router.post(
  "/:slug/store-finished-multi",
  MultiChoiceTestController.storeFinishedTest
);

//[get] Trả về tất cả các test đã nộp trùng với ID
router.get(
  "/:slug/store-finished-multi/:id/detail",
  MultiChoiceTestController.showAllStoredFinish
);

//[get] Trả về nội dung test trùng với ID
router.get("/show-detail/:id", MultiChoiceTestController.showSpecificTest);

//[get] Trả về danh sách bài thi của riên 1 học sinh
router.get(
  "/:teacher/list-finished-multi/:student",
  MultiChoiceTestController.listedStudentTest
);

router.put("/:teacher/:id/update", MultiChoiceTestController.updateTest);
module.exports = router;
