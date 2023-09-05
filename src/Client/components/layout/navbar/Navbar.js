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
  const [visible2, setVisible2] = useState(false);
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
            <p className="userWelcome">Xin chào {account}</p>
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
              Kiểm Tra <span />
              <FontAwesomeIcon icon={faCaretDown} />
            </a>
            {visible && (
              <ul className="subnav">
                <li key={"trac"}>
                  <Link to="/trac-nghiem">Trắc nghiệm</Link>
                </li>
                <li key={"tu"}>
                  <Link to="/tu-luan">Tự luận</Link>
                </li>
                <li key={"combined"}>
                  <Link to="/combined">Tổng Hợp</Link>
                </li>
              </ul>
            )}
          </li>

          <li key={"practice"}>
            <Link to="/practice">Ôn Luyện</Link>
          </li>

          <li
            key={"create-lesson"}
            onMouseOut={() => setVisible2(false)}
            onMouseOver={() => setVisible2(true)}
          >
            <a>
              Tạo bài kiểm tra <span />
              <FontAwesomeIcon icon={faCaretDown} />
            </a>
            {visible2 && (
              <ul className="subnav">
                <li key={"creMul"}>
                  <Link to={`/${account}/create-multichoice`}>Trắc Nghiệm</Link>
                </li>
                <li key={"essay"}>
                  <Link to={`/${account}/create-essay`}>Tự luận</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
