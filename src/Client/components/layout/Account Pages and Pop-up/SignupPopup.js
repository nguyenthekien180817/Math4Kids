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
          <form method="post" action="http://localhost:4000/account/create">
            <label className="formLabel" htmlFor="email">
              Email
            </label>
            <input type="email" className="formInput" id="email" name="email" />
            <label className="formLabel" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              className="formInput"
              id="password"
              name="password"
            />

            <button type="submit" className="loginButtonPopup">
              Thêm khóa học
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPopup;
