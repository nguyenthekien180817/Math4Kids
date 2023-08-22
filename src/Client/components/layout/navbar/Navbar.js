import React from "react";
import { useState, createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import FormPopup from "../Account Pages and Pop-up/FormPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./assets/styles/navbar.css";

export const ClickOutContext = createContext();
export const TypeContext = createContext();
export const SetSignUpContext = createContext();

function Navbar() {
  const [account, setAccount] = useState(null);
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [type, setType] = useState("");
  let closePopup = () => {
    setFormVisible(false);
  };

  let changeToSignup = () => {
    setType("signup");
    setFormVisible(true);
  };

  let handleLoginClick = () => {
    setType("login");
    if (!formVisible) {
      setFormVisible(true);
    } else {
      setFormVisible(false);
    }
  };

  let handleSignupClick = () => {
    setType("signup");
    if (!formVisible) {
      setFormVisible(true);
    } else {
      setFormVisible(false);
    }
  };

  // Get login data
  // useEffect(() => {
  //   fetch("http://localhost:4000/account/validation")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAccount(data);
  //     });
  // }, []);

  return (
    <div>
      <div className="navbarContainer">
        {account && (
          <div>
            <button className="signupButton" onClick={() => setAccount(null)}>
              Logout
            </button>
          </div>
        )}
        {!account && (
          <div>
            <button className="loginButton" onClick={handleLoginClick}>
              Login
            </button>

            <button className="signupButton" onClick={handleSignupClick}>
              Sign Up
            </button>
          </div>
        )}
        <SetSignUpContext.Provider value={changeToSignup}>
          <TypeContext.Provider value={type}>
            <ClickOutContext.Provider value={closePopup}>
              {formVisible && <FormPopup />}
            </ClickOutContext.Provider>
          </TypeContext.Provider>
        </SetSignUpContext.Provider>
        <ul id="nav">
          <li key={"/"}>
            <Link to="/">Home</Link>
          </li>
          <li key={"/ly-thuyet"}>
            <Link to="/ly-thuyet">Lý Thuyết</Link>
          </li>

          <li
            key={"dropdown"}
            onMouseOut={() => setVisible(false)}
            onMouseOver={() => setVisible(true)}
          >
            <a>
              Ôn Luyện <span />
              <FontAwesomeIcon icon={faCaretDown} />
            </a>
            {visible && (
              <ul className="subnav">
                <li key={"quiz"}>
                  <Link to="/quiz">Đố Vui</Link>
                </li>
                <li key={"trac"}>
                  <Link to="/trac-nghiem">Kiểm tra trắc nghiệm</Link>
                </li>
                <li key={"tu"}>
                  <Link to="/tu-luan">Kiểm tra tự luận</Link>
                </li>
              </ul>
            )}
          </li>

          <li key={"test"}>
            <Link to="/test">Kiểm Tra</Link>
          </li>

          <li key={"create-lesson"}>
            <Link to="/ly-thuyet/create-lesson">Tạo Bài Giảng</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
