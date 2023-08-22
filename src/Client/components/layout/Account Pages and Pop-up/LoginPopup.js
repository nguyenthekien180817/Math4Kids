import React from "react";
import "./loginPopup.css";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { ClickOutContext, SetSignUpContext } from "../navbar/Navbar";
import { Button } from "bootstrap";
function LoginPopup(props) {
  const closeFunction = useContext(ClickOutContext);
  const setType = useContext(SetSignUpContext);
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
          <form method="post" action="http://localhost:4000/account/validation">
            <label className="formLabel" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="formInput"
            ></input>
            <label className="formLabel" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="formInput"
            ></input>
            <a
              className="passwordRevcovery"
              href="password-recovery"
              target="_blank"
            >
              Quên mật khẩu?
            </a>
            <button type="submit" className="loginButtonPopup">
              Đăng Nhập Ngay!
            </button>
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
