import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupPage(props) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [accountName, setAccountName] = useState("");
  const [level, setLevel] = useState("student");

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        if (response.data.level == "admin") {
          setLevel("teacher");
        }
        console.log(level);
      })
      .catch((err) => {});
  }, []);

  let register = () => {
    if (email == "") {
      toast.warn("Email không được để trống!", {
        pauseOnFocusLoss: false,
      });
    }

    if (password == "") {
      toast.warn("Mật khẩu không được để trống", {
        pauseOnFocusLoss: false,
      });
    } else if (repeatPassword == "") {
      toast.warn("Mật khẩu nhập lại không được để trống", {
        pauseOnFocusLoss: false,
      });
    } else if (repeatPassword != password) {
      toast.warn("Mật khẩu nhập lại không khớp", {
        pauseOnFocusLoss: false,
      });
    } else if (password == repeatPassword && email != "") {
      axios({
        method: "POST",
        data: {
          level: level,
          email: email,
          password: password,
          accountName: accountName,
        },
        withCredentials: true,
        url: "http://localhost:4000/account/create",
      }).then((response) => {
        if (response.data == "Done" && level != "teacher") {
          toast.loading(
            "Tạo tài khoản thành công, đang chuyển hướng tới trang đăng nhập",
            {
              pauseOnFocusLoss: false,
            }
          );
          // setTimeout(() => {
          //   window.location.replace("http://localhost:3000/login");
          // }, 4000);
        } else {
          toast.success("Tạo tài khoản giáo viên thành công", {
            pauseOnFocusLoss: false,
          });
          setTimeout(() => {
            window.location.replace("http://localhost:3000");
          }, 4000);
        }
      });
    }
  };
  return (
    <div>
      <div className="loginBackground">
        <div className="loginFormContainer">
          <div className="popupHeader">
            <h1>
              Đăng ký tài khoản {level == "teacher" ? "Giáo Viên" : "Học Sinh"}
            </h1>
          </div>
          {console.log(level)}
          <label className="formLabel" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="formInput"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="formLabel" htmlFor="accountName">
            Tên Người Dùng
          </label>
          <input
            type="text"
            className="formInput"
            id="accountName"
            name="accountName"
            onChange={(e) => setAccountName(e.target.value)}
          />

          <label className="formLabel" htmlFor="password">
            Mật khẩu
          </label>
          <input
            type="password"
            className="formInput"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="formLabel" htmlFor="password">
            Nhập lại mật khẩu
          </label>
          <input
            type="password"
            className="formInput"
            id="repass"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          <button className="loginButtonPopup" onClick={register}>
            Đăng ký
          </button>
          <ToastContainer limit={2} style={{ marginTop: "30px" }} />
          <p className="registration">
            Bạn đã có tài khoản?
            <div>
              <Link to="/signup" style={{ cursor: "pointer" }}>
                Đăng nhập ngay!
              </Link>
            </div>
          </p>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
