import React from "react";
import "./loginPopup.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { ClickOutContext, SetSignUpContext } from "../navbar/Navbar";
function LoginPopup(props) {
  const closeFunction = useContext(ClickOutContext);
  const setType = useContext(SetSignUpContext);
  const [accountData, setAccountData] = useState(null);

  // console.log(props);
  return (
    <div>
      <div className="loginBackground" onClick={() => closeFunction()}>
        <div
          className="loginFormContainer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="popupHeader">
            <h1 style={{}}>Login</h1>
          </div>
          <form>
            <label className="formLabel" htmlFor="email">
              Email
            </label>
            <input type="email" className="formInput"></input>
            <label className="formLabel" htmlFor="password">
              Password
            </label>
            <input minLength="12" type="password" className="formInput"></input>
            <a
              className="passwordRevcovery"
              href="password-recovery"
              target="_blank"
            >
              Quên mật khẩu?
            </a>
            <input
              value={"Đăng Nhập Ngay!"}
              type="submit"
              className="loginButtonPopup"
            />
          </form>
          <p className="registration">
            Bạn chưa có tài khoản?
            <div
              onClick={() => {
                setType();
              }}
            >
              <a style={{ cursor: "pointer" }}>Đăng ký ngay!</a>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
