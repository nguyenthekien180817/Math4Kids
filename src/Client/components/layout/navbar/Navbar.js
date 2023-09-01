import React from "react";
import { useState, createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./assets/styles/navbar.css";

export const ClickOutContext = createContext();
export const TypeContext = createContext();
export const SetSignUpContext = createContext();

function Navbar() {
  const [account, setAccount] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        console.log("Current Account: " + response.data);
        setAccount(response.data);
      })
      .catch((err) => {});
  }, []);

  let logout = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4000/account/signout",
    })
      .then(window.location.replace("http://localhost:3000/login"))
      .catch((err) => {});
  };

  return (
    <div>
      <div className="navbarContainer">
        {account ? (
          <div>
            <button className="signupButton" onClick={logout}>
              Logout
            </button>
            <p className="loginButton">{account}</p>
          </div>
        ) : (
          <div>
            <Link to="/login" className="loginButton">
              Login
            </Link>

            <Link to="/signup" className="signupButton">
              Sign Up
            </Link>
          </div>
        )}
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
