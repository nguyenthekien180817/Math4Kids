const express = require("express");
const router = express.Router();
const EssayTestController = require("../controllers/EssayTestController");

//router /essay-test

//[GET] show tat ca cac bai thi cua 1 giao vien nhat dinh đã đăng
router.get("/:slug/show-essay-test", EssayTestController.show);

//[GET] show mot bai thi nhat dinh
router.get("/show-detail/:id", EssayTestController.showIndividual);

//[Luu bai thi]
router.post("/:email/store", EssayTestController.store);

//[GET] show tat ca cac bai thi da duoc nop cua 1 giao vien nhat dinh
router.get(
  "/:slug/store-finished-essay/:id/detail",
  EssayTestController.showAllStoredFinish
);

//[GET] show tất cả bài thi đã nộp của 1 học sinh
router.get(
  "/:student/show-student-finished-essay",
  EssayTestController.showAllStudentSubmissions
);

//[PUT] update bài thi của giáo viên
router.put("/:teacher/:id/update", EssayTestController.updateEssayTest);

//[POST] luu bai thi cua hoc sinh
router.post(
  "/:slug/store-finished-essay",
  EssayTestController.storeFinishedTest
);

//[GET] Lấy danh sách bài thi đã làm của một học sinh nhất định
router.get(
  "/:teacher/list-finished-essay/:student",
  EssayTestController.listedStudentTest
);

//[put] Sửa bài thi
router.put(
  "/:teacher/list-finished-essay/:id/update",
  EssayTestController.updateSubmittedTest
);

module.exports = router;
