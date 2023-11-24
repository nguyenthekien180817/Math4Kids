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
  const [account, setAccount] = useState({
    level: "",
    email: "",
  });
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [level, setLevel] = useState("student");
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        console.log(response.data);
        setAccount(response.data);
      })
      .catch((err) => {});
  }, []);

  let logout = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: `http://localhost:4000/account/${account.email}/signout`,
    })
      .then(window.location.reload())
      .catch((err) => {});
  };

  return (
    <div>
      <div className="navbarContainer">
        {account.level != "" ? (
          <div>
            <button className="signupButton" onClick={logout}>
              Logout
            </button>
            <Link
              style={{ color: "white" }}
              className="userWelcome"
              to={account.email}
            >
              Xin chào {account.accountName}
            </Link>
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
          <li key={window.crypto.randomUUID()}>
            <Link to="/">Home</Link>
          </li>
          <li key={window.crypto.randomUUID()}>
            <Link to="/ly-thuyet">Lý Thuyết</Link>
          </li>

          <li
            key={window.crypto.randomUUID()}
            onMouseOut={() => setVisible(false)}
            onMouseOver={() => setVisible(true)}
          >
            {account.level != "" ? (
              <a>
                Kiểm Tra <span />
                <FontAwesomeIcon icon={faCaretDown} />
              </a>
            ) : (
              <></>
            )}

            {visible && (
              <ul className="subnav">
                <li key={window.crypto.randomUUID()}>
                  <Link to="/trac-nghiem">Trắc nghiệm</Link>
                </li>
                <li key={window.crypto.randomUUID()}>
                  <Link to="/tu-luan">Tự luận</Link>
                </li>
              </ul>
            )}
          </li>

          <li
            key={window.crypto.randomUUID()}
            onMouseOut={() => setVisible2(false)}
            onMouseOver={() => setVisible2(true)}
          >
            {account.level == "teacher" || account.level == "admin" ? (
              <a>
                Tạo bài kiểm tra <span />
                <FontAwesomeIcon icon={faCaretDown} />
              </a>
            ) : (
              <></>
            )}

            {visible2 && (
              <ul className="subnav">
                {account == null ? (
                  <li>
                    <Link to="/login">Trắc Nghiệm</Link>
                  </li>
                ) : (
                  <li key={window.crypto.randomUUID()}>
                    <Link to={`/${account.email}/create-multichoice`}>
                      Trắc Nghiệm
                    </Link>
                  </li>
                )}

                {account == null ? (
                  <li>
                    <Link to="/login">Tự luận</Link>
                  </li>
                ) : (
                  <li key={window.crypto.randomUUID()}>
                    <li key={window.crypto.randomUUID()}>
                      <Link to={`/${account.email}/create-essay`}>Tự luận</Link>
                    </li>
                  </li>
                )}
              </ul>
            )}
          </li>
          <li
            key={window.crypto.randomUUID()}
            onMouseOut={() => setVisible3(false)}
            onMouseOver={() => setVisible3(true)}
          >
            {account.level == "admin" ? (
              <>
                <a>
                  Admin <span />
                  <FontAwesomeIcon icon={faCaretDown} />
                </a>
              </>
            ) : (
              <></>
            )}

            {visible3 && (
              <ul className="subnav">
                <li key={window.crypto.randomUUID()}>
                  <Link to="/signup">Tạo tài khoản giáo viên</Link>
                </li>
                <li key={window.crypto.randomUUID()}>
                  <Link to="/ly-thuyet/create">
                    Đăng nội dung sách giáo khoa
                  </Link>
                </li>
                <li key={window.crypto.randomUUID()}>
                  <Link to={"/account-control"}>Quản Lý Tài Khoản</Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to={"/huong-dan"}>Hướng dẫn sử dụng</Link>
          </li>
        </ul>
      </div>

      {/* For DEMO================================================================================ */}
      {/* <div className="navbarContainer">
        <ul id="nav">
          <li key={window.crypto.randomUUID()}>
            <Link to="/">Home</Link>
          </li>
          <li key={window.crypto.randomUUID()}>
            <Link to="/ly-thuyet">Lý Thuyết</Link>
          </li>

          <li
            key={window.crypto.randomUUID()}
            onMouseOut={() => setVisible(false)}
            onMouseOver={() => setVisible(true)}
          >
            <a>
              Kiểm Tra <span />
              <FontAwesomeIcon icon={faCaretDown} />
            </a>
            {visible && (
              <ul className="subnav">
                <li key={window.crypto.randomUUID()}>
                  <Link to="/trac-nghiem">Trắc nghiệm</Link>
                </li>
                <li key={window.crypto.randomUUID()}>
                  <Link to="/tu-luan">Tự luận</Link>
                </li>
              </ul>
            )}
          </li>

          <li
            key={window.crypto.randomUUID()}
            onMouseOut={() => setVisible2(false)}
            onMouseOver={() => setVisible2(true)}
          >
            {account.level == "teacher" || account.level == "admin" ? (
              <a>
                Tạo bài kiểm tra <span />
                <FontAwesomeIcon icon={faCaretDown} />
              </a>
            ) : (
              <></>
            )}

            {visible2 && (
              <ul className="subnav">
                {account == null ? (
                  <li>
                    <Link to="/login">Trắc Nghiệm</Link>
                  </li>
                ) : (
                  <li key={window.crypto.randomUUID()}>
                    <Link to={`/${account.email}/create-multichoice`}>
                      Trắc Nghiệm
                    </Link>
                  </li>
                )}

                {account == null ? (
                  <li>
                    <Link to="/login">Tự luận</Link>
                  </li>
                ) : (
                  <li key={window.crypto.randomUUID()}>
                    <li key={window.crypto.randomUUID()}>
                      <Link to={`/${account.email}/create-essay`}>Tự luận</Link>
                    </li>
                  </li>
                )}
              </ul>
            )}
          </li>
          <li
            key={window.crypto.randomUUID()}
            onMouseOut={() => setVisible3(false)}
            onMouseOver={() => setVisible3(true)}
          >
            {account.level == "admin" ? (
              <>
                <a>
                  Admin <span />
                  <FontAwesomeIcon icon={faCaretDown} />
                </a>
              </>
            ) : (
              <></>
            )}

            {visible3 && (
              <ul className="subnav">
                <li key={window.crypto.randomUUID()}>
                  <Link to="/signup">Tạo tài khoản giáo viên</Link>
                </li>
                <li key={window.crypto.randomUUID()}>
                  <Link to="/ly-thuyet/create">
                    Đăng nội dung sách giáo khoa
                  </Link>
                </li>
                <li key={window.crypto.randomUUID()}>
                  <Link to={"/account-control"}>Quản Lý Tài Khoản</Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to={"/huong-dan"}>Hướng dẫn sử dụng</Link>
          </li>
        </ul>
      </div> */}
    </div>
  );
}

export default Navbar;
