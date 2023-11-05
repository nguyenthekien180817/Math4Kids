import React, { useState, useEffect } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "../layout/Manual Page/ManualPage.css";
import {
  LYTHUYET,
  DANGKY,
  DANGNHAP,
  EDITACCOUNT,
  DOTEST,
  MANAGESUBMITTEDSTUDENT,
  CREATETEST,
  MANAGETEST,
  MANAGESUBMITTED,
  CREATEBOOK,
  CREATTEACHERACCOUNT,
  MANAGEACCOUNTADMIN,
} from "../layout/Manual Page";

function ManualPage() {
  const [level, setLevel] = useState("student");
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        setLevel(response.data.level);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="manualContainer">
      <div className="manualItem">
        <h4
          data-toggle="collapse"
          href="#signup"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <FontAwesomeIcon style={{ height: "20px" }} icon={faPlay} />
          Hướng dẫn đăng ký.
        </h4>

        <div class="collapse" id="signup">
          <div class="card card-body">
            <h4>Đăng ký</h4>
            <p>
              Ở màn hình chính, nhấn nút "Sign Up" ở góc trên trái màn hình.
            </p>
            <img src={DANGKY.img1} />
            <p>Cửa sổ đăng ký sẽ mở ra.</p>
            <img src={DANGKY.img2} />
            <p>
              Người sử dụng chỉ cần nhập thông tin đăng ký và nhấn nút "Đăng Ký"
              phía dưới.
            </p>
          </div>
        </div>
      </div>

      <div className="manualItem">
        <h4
          data-toggle="collapse"
          href="#login"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <FontAwesomeIcon style={{ height: "20px" }} icon={faPlay} />
          Hướng dẫn đăng nhập.
        </h4>

        <div class="collapse" id="login">
          <div class="card card-body">
            <h4>Đăng nhập</h4>
            <p>Ở màn hình chính, nhấn nút "Login" ở góc trên trái màn hình.</p>
            <img src={DANGNHAP.img1} />
            <p>Cửa sổ đăng nhập sẽ mở ra.</p>
            <img src={DANGNHAP.img2} />
            <p>
              Người sử dụng nhập thông tin mình đã đăng ký từ trước để đăng
              nhập.
            </p>
          </div>
        </div>
      </div>

      <div className="manualItem">
        <h4
          data-toggle="collapse"
          href="#LyThuyet"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <FontAwesomeIcon style={{ height: "20px" }} icon={faPlay} />
          Hướng dẫn xem lý thuyết.
        </h4>

        <div class="collapse" id="LyThuyet">
          <div class="card card-body">
            <h4>Xem lý thuyết</h4>
            <p>
              Ở màn hình chính, nhấn nút "Lý Thuyết" ở góc trên phải màn hình.
            </p>
            <img src={LYTHUYET.img1} />
            <p>Cửa sổ chọn sách giáo khoa sẽ mở ra.</p>
            <img src={LYTHUYET.img2} />
            <p>
              Người sử chọn sách giáo khoa mà mình muốn và được đưa đến cửa sổ
              chọn bài giảng.
            </p>
            <img src={LYTHUYET.img3} />
            <p>
              Người sử chọn bài giảng mình muốn và được đưa đến cửa sổ điều
              khiển sách online
            </p>
            <img src={LYTHUYET.img4} />
            <p>
              - Người dùng nhấn nút "Trang trước" để đi đến trang phía trước
              <br />
              - Người dùng nhấn nút "Trang sau" để đi đến trang phía sau <br />
              - Người dùng nhấn nút "Mục lục" để được đưa đến trang mục lục
              <br />- Người dùng có thể nhập số trang mình muốn đến qua ô vuông
              màu trắng và nhấn "Enter"
            </p>
          </div>
        </div>
      </div>

      <div className="manualItem">
        <h4
          data-toggle="collapse"
          href="#editAccount"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <FontAwesomeIcon style={{ height: "20px" }} icon={faPlay} />
          Hướng dẫn chỉnh sửa thông tin tài khoản.
        </h4>

        <div class="collapse" id="editAccount">
          <div class="card card-body">
            <h4>Chỉnh sửa tài khoản</h4>
            <p>
              Ở màn hình chính, sau khi đăng nhập, người dùng nhấn vào nút "Xin
              chào + tên người dùng".
            </p>
            <img src={EDITACCOUNT.img1} />
            <p>Cửa sổ thông tin cá nhân sẽ mở ra.</p>
            <img src={EDITACCOUNT.img2} />
            <p>
              - Người dùng bấm nút "Edit" để có thể chỉnh sửa tên của mình, sau
              khi bấm "Edit", nút "Edit" sẽ chuyển thành nút "Save". Người dùng
              tiếp tục bấm nút "Save" để lưu thông tin chỉnh sửa
              <br />- Người dùng nhấn vào nút "Đổi mật khẩu" để mở phần chỉnh
              sửa mật khẩu. Sau đó người dùng nhập thông tin mình muốn vào và
              nhấn "Lưu mật khẩu" để lưu mật khẩu mới
            </p>
          </div>
        </div>
      </div>
      {/*====================================================== Chung ============================================================*/}
      {/*====================================================== Chung ============================================================*/}
      {/*====================================================== Chung ============================================================*/}
      <div className="manualItem">
        <h4
          data-toggle="collapse"
          href="#dotest"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <FontAwesomeIcon style={{ height: "20px" }} icon={faPlay} />
          Hướng dẫn làm bài.
        </h4>

        <div class="collapse" id="dotest">
          <div class="card card-body">
            <h4>Làm bài kiểm tra</h4>
            <p>
              Học sinh đưa chuột vào nút "Kiểm tra", cửa sổ hiện ra 2 nút "Trắc
              nghiệm" để học sinh làm bài trắc nghiệm và "Tự luận" để học sinh
              làm bài tự luận
            </p>
            <img src={DOTEST.img1} />
            <p>
              Sau khi học sinh chọn loại bài kiểm tra, cửa sổ sẽ hiển thị màn
              hình nhập mã bài kiểm tra. Cửa sổ ở dưới là màn hình bài kiểm tra
              trắc nghiệm, mã bài làm sẽ được giáo viên cung cấp.
            </p>
            <img src={DOTEST.img2} />
            <p>
              Sau khi nhập mã bài kiểm tra, cửa sổ sẽ hiện bài kiểm tra cho học
              sinh.
            </p>
            <img src={DOTEST.img3} />
            <p>
              Học sinh chọn đáp án hoặc điền nội dung đáp án vào và nhấn nút
              "Nộp bài" để nộp bài. Nếu học sinh làm bài kiểm tra tự luận và
              muốn gửi ảnh thay vì gõ nội dung, học sinh có thể chọn nút "Chọn
              ảnh đính kèm" để lấy ảnh. Hình ảnh được chọn sẽ hiển thị ở ngay
              dưới nút bấm.
            </p>
            <img src={DOTEST.img4} />
          </div>
        </div>
      </div>

      <div className="manualItem">
        <h4
          data-toggle="collapse"
          href="#submittedStudent"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <FontAwesomeIcon style={{ height: "20px" }} icon={faPlay} />
          Hướng dẫn xem kết quả thi.
        </h4>

        <div class="collapse" id="submittedStudent">
          <div class="card card-body">
            <h4>Xem kết quả bài thi</h4>
            <p>
              Ở màn hình chính, sau khi đăng nhập, học sinh nhấn vào nút "Xin
              chào + tên người dùng".
            </p>
            <img src={MANAGESUBMITTEDSTUDENT.img1} />
            <p>
              Cửa sổ thông tin tài khoản sẽ mở ra. Học sinh kéo con lăn chuột
              xuống dưới để xem danh sách các bài kiểm tra mình đã nộp. Để xem
              chi tiết lịch sử làm bài, học sinh bấm vào nút "Chi tiết"
            </p>
            <img src={MANAGESUBMITTEDSTUDENT.img2} />
          </div>
        </div>
      </div>
      {/*====================================================== Hoc sinh ============================================================*/}
      {/*====================================================== Chung ============================================================*/}
      {/*====================================================== Chung ============================================================*/}
      {(level == "teacher" || level == "admin") && (
        <>
          <div className="manualItem">
            <h4
              data-toggle="collapse"
              href="#createTest"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <FontAwesomeIcon style={{ height: "20px" }} icon={faPlay} />
              Hướng dẫn tạo bài kiểm tra.
            </h4>

            <div class="collapse" id="createTest">
              <div class="card card-body">
                <h4>Tạo bài kiểm tra</h4>
                <p>
                  Ở màn hình chính sau khi đăng nhập, giáo viên đưa con trỏ
                  chuột vào nút "Tạo bài kiểm tra", hai cột mới sẽ hiện ra. Giáo
                  viên chọn cột tương ứng với loại bài kiểm tra mình muốn tạo.
                </p>
                <img src={CREATETEST.img1} />
                <p>
                  Ở cửa sổ tạo bài kiểm tra trắc nghiệm hoặc tự luận, giáo viên
                  nhập thông tin bài kiểm tra và câu hỏi vào các trường. Để thêm
                  câu hỏi, giáo viên nhấn vào nút "Thêm câu hỏi". Để xoá câu hỏi
                  cuối cùng, giáo viên nhấn vào nút "Xoá câu hỏi". Nếu giáo viên
                  muốn câu hỏi đính kèm ảnh, giáo viên nhấn vào nút "File ĐÍnh
                  Kèm" và chọn ảnh.
                </p>
                <img src={CREATETEST.img2} />
                <p>
                  Sau khi giáo viên đã điền đầy đủ các nội dung, giáo viên nhấn
                  nút "Đăng bài thi" để lưu lại bài thi
                </p>
                <img src={CREATETEST.img3} />
              </div>
            </div>
          </div>

          <div className="manualItem">
            <h4
              data-toggle="collapse"
              href="#manageTest"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <FontAwesomeIcon style={{ height: "20px" }} icon={faPlay} />
              Hướng dẫn quản lý bài thi.
            </h4>

            <div class="collapse" id="manageTest">
              <div class="card card-body">
                <h4>Quản lý bài thi</h4>
                <p>
                  Ở màn hình chính, sau khi đăng nhập, giáo viên nhấn vào nút
                  "Xin chào + tên người dùng".
                </p>
                <img src={MANAGETEST.img1} />
                <p>
                  Cửa sổ thông tin tài khoản sẽ mở ra. Giáo viên kéo con lăn
                  chuột xuống dưới để xem danh sách các bài kiểm tra mình đã
                  tạo. Để xem chi tiết của bài kiểm tra, giáo viên nhấn vào nút
                  "Chi tiết".
                </p>
                <img src={MANAGETEST.img2} />
                <p>
                  Sau khi nhấn vào nút "Chi tiết", cửa sổ hiện ra thông tin chi
                  tiết của bài kiểm tra.
                </p>
                <img src={MANAGETEST.img3} />
                <p>
                  Để chỉnh sửa thông tin bài kiểm tra, giáo viên nhấn vào nút
                  chỉnh sửa rồi nhập thông tin mình muốn sửa vào các trường. Để
                  xoá bài kiểm tra, giáo viên nhấn vào nút "Xoá bài thi". Cửa sổ
                  cảnh báo sẽ hiện ra như hình dưới, giáo viên nhấn "Không" để
                  huỷ và nhấn "Có" để xác nhận xoá
                </p>
                <img src={MANAGETEST.img4} />
              </div>
            </div>
          </div>

          <div className="manualItem">
            <h4
              data-toggle="collapse"
              href="#manageSubmitted"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <FontAwesomeIcon style={{ height: "20px" }} icon={faPlay} />
              Hướng dẫn quản lý bài nộp của học sinh.
            </h4>

            <div class="collapse" id="manageSubmitted">
              <div class="card card-body">
                <h4>Quản lý bài nộp của học sinh</h4>
                <p>
                  Ở màn hình quản lý bài kiểm tra, giáo viên có thể nhấn vào tên
                  các bài kiểm tra để hiển thị danh sách bài nộp của học sinh.
                </p>
                <img src={MANAGESUBMITTED.img1} />
                <p>
                  Ở màn hình liệt kê, giáo viên có thể bấm vào mục "Chi tiết" để
                  xem nội dung được nộp
                </p>
                <img src={MANAGESUBMITTED.img2} />
                <img src={MANAGESUBMITTED.img3} />
                <p>
                  Đối với bài nộp tự luận, giáo viên có thể nhấn vào nút chỉnh
                  sửa để thay đổi và ghi nhận xét bài làm cho học sinh.
                </p>
                <img src={MANAGESUBMITTED.img5} />
                <p>
                  Giáo viên cũng có thể nhấn vào tên học sinh đã nộp bài để có
                  thể xem được danh sách những bài nộp từ học sinh này
                </p>
                <img src={MANAGESUBMITTED.img4} />
              </div>
            </div>
          </div>
        </>
      )}

      {/*====================================================== Giao Vien ============================================================*/}
      {/*====================================================== Chung ============================================================*/}
      {/*====================================================== Chung ============================================================*/}
      {level == "admin" && (
        <>
          <div className="manualItem">
            <h4
              data-toggle="collapse"
              href="#createBook"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <FontAwesomeIcon style={{ height: "20px" }} icon={faPlay} />
              Hướng dẫn tạo thông tin sách giáo khoa.
            </h4>

            <div class="collapse" id="createBook">
              <div class="card card-body">
                <h4>Tạo thông tin sách giáo khoa</h4>
                <p>
                  Từ màn hình chính sau khi đăng nhập, quản trị viên đưa con trỏ
                  chuột vào mục "Admin". 3 mục mới sẽ hiện ra, quản trị viên
                  chọn mục "Đăng nội dung sách giáo khoa"
                </p>
                <img src={CREATEBOOK.img1} />
                <p>
                  Sau khi bấm mục "Đăng nội dung sách giáo khoa", cửa sổ sẽ hiện
                  ra các phục điền thông tin{" "}
                </p>
                <img src={CREATEBOOK.img2} />
                <p>
                  Quản trị viên điền vào các trường các nội dung của sách giáo
                  khoa. Riêng trường "Nhập Tên Các Bài Học" và "Nhập các trang
                  của các bài học dựa theo mục lục", các nội dung được phân tách
                  bằng dấu ";" và dấu cách " ".
                </p>
                <img src={CREATEBOOK.img3} />
              </div>
            </div>
          </div>

          <div className="manualItem">
            <h4
              data-toggle="collapse"
              href="#createTeacher"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <FontAwesomeIcon style={{ height: "20px" }} icon={faPlay} />
              Hướng dẫn tạo tài khoản giáo viên.
            </h4>

            <div class="collapse" id="createTeacher">
              <div class="card card-body">
                <h4>Tạo tài khoản giáo viên</h4>
                <p>
                  Từ màn hình chính sau khi đăng nhập, quản trị viên đưa con trỏ
                  chuột vào mục "Admin". 3 mục mới sẽ hiện ra, quản trị viên
                  chọn mục "Tạo tài khoản giáo viên"
                </p>
                <img src={CREATTEACHERACCOUNT.img1} />
                <p>
                  Cửa sổ mới sẽ hiển thị nội dung như cửa sổ đăng ký tài khoản
                  bình thường. Quản trị viên nhập thông tin tài khoản giáo viên
                  theo yêu cầu và nhấn "Đăng ký" để đăng ký.
                </p>
                <img src={CREATTEACHERACCOUNT.img2} />
              </div>
            </div>
          </div>

          <div className="manualItem">
            <h4
              data-toggle="collapse"
              href="#accountManageAdmin"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <FontAwesomeIcon style={{ height: "20px" }} icon={faPlay} />
              Hướng dẫn quản lý tài khoản.
            </h4>

            <div class="collapse" id="accountManageAdmin">
              <div class="card card-body">
                <h4>Quản lý tài khoản</h4>
                <p>
                  Từ màn hình chính sau khi đăng nhập, quản trị viên đưa con trỏ
                  chuột vào mục "Admin". 3 mục mới sẽ hiện ra, quản trị viên
                  chọn mục "Quản lý tài khoản"
                </p>
                <img src={MANAGEACCOUNTADMIN.img1} />
                <p>Cửa sổ mới sẽ hiện ra trang quản lý tài khoản</p>
                <img src={MANAGEACCOUNTADMIN.img2} />
                <p>
                  Để hiển thị tất cả các tài khoản, nhấn phím "space" vào thanh
                  tìm kiếm
                </p>
                <img src={MANAGEACCOUNTADMIN.img6} />
                <p>
                  Để tìm kiếm tài khoản, điền thông tin muốn tìm vào thanh tìm
                  kiếm
                </p>
                <img src={MANAGEACCOUNTADMIN.img3} />

                <p>
                  Nhấn vào nút chỉnh sửa để chỉnh sửa thông tin của tài khoản
                  đó. Sau khi chỉnh sửa, nhấn nút "Lưu chỉnh sửa" ở phía bên
                  phải để lưu thông tin.
                </p>
                <img src={MANAGEACCOUNTADMIN.img4} />
                <p>
                  Để xoá tài khoản, quản trị viên nhấn vào nút "Xoá tài khoản" ở
                  góc phải phía dưới. Trang web sẽ hiện lên cửa sổ cảnh báo.
                  Nhấn "Không" để huỷ và nhấn "Có" để xác nhận xoá tài khoản.
                </p>
                <img src={MANAGEACCOUNTADMIN.img5} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ManualPage;
