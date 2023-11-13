import React, { useState, useEffect } from "react";
import "../layout/Account Pages and Pop-up/loginPopup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage(props) {
  const [loginAccount, setLoginAccount] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();
  const cookie = localStorage.getItem("Cookie");

  let login = () => {
    console.log(loginAccount, loginPassword);
    axios({
      method: "POST",
      data: {
        email: loginAccount,
        password: loginPassword,
      },
      headers: {
        Cookie: cookie,
      },
      withCredentials: true,
      url: "http://localhost:4000/account/validation",
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.user.message == "Done") {
          toast.success("Đăng nhập thành công, chuyển hướng đến trang chủ");
          setTimeout(() => {
            window.location.replace(
              // "https://nguyenthekien180817.github.io/Math4Kids/"
              "http://localhost:3000/"
            );
          }, 500);
        } else {
          toast.warn("Sai tài khoản hoặc mật khẩu");
        }
      })
      .catch((err) => console.log(err));
  };

  let getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <ToastContainer autoClose={500} limit={2} style={{ marginTop: "30px" }} />
      <div className="loginBackground">
        <div className="loginFormContainer">
          <div className="popupHeader">
            <h1>Login</h1>
          </div>

          <label className="formLabel" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="formInput"
            onChange={(e) => setLoginAccount(e.target.value)}
          ></input>
          <label className="formLabel" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="formInput"
            onChange={(e) => setLoginPassword(e.target.value)}
          ></input>

          <button className="loginButtonPopup" onClick={login}>
            Đăng Nhập Ngay!
          </button>
          {/* <button className="loginButtonPopup" onClick={getUser}>
            Nhận thông tin!
          </button> */}
          <p className="registration">
            Bạn chưa có tài khoản?
            <div>
              <Link to="/signup" style={{ cursor: "pointer" }}>
                Đăng ký ngay!
              </Link>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
