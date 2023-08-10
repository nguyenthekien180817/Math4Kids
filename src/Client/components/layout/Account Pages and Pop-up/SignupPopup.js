import React from "react";
import "./loginPopup.css";
import { useContext } from "react";
import { ClickOutContext } from "../navbar/Navbar";
function SignupPopup(props) {
  const closeFunction = useContext(ClickOutContext);
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
            <h1 style={{}}>Sign Up</h1>
          </div>
          <form>
            <label className="formLabel" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="formInput"
              id="email"
              required
            ></input>
            <label className="formLabel" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              className="formInput"
              id="email"
              required
            ></input>

            <label className="formLabel" htmlFor="password">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="formInput"
              id="email"
              required
            ></input>
            <input
              value={"Đăng Ký Ngay!"}
              type="submit"
              className="loginButtonPopup"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPopup;
