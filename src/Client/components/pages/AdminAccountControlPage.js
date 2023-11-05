import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AdminAccountControlPage() {
  const [level, setLevel] = useState("student");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [editAccount, setEditAccount] = useState(null);
  const [deleteAccount, setDeleteAccount] = useState(null);
  const [editLevel, setEditLevel] = useState(null);
  const [editPassword, setEditPassword] = useState("");
  const [show, setShow] = useState({
    edit: null,
    warning: null,
  });
  const [inputType, setInputType] = useState("password");

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        console.log(response.data);
        setLevel(response.data.level);
      })
      .catch((err) => {});
  }, []);

  let getData = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: `http://localhost:4000/account/${level}/get-all-accounts`,
      data: {
        value: searchValue,
      },
    }).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  let handleInput = (e) => {
    setSearchValue(e.currentTarget.value);
    getData();
  };

  let handleEditData = (e, index) => {
    let copiedObject = data;
    switch (e.currentTarget.id) {
      case "level":
        copiedObject[index].level = e.currentTarget.value;
        setData(copiedObject);
        setEditLevel(e.currentTarget.value);
        break;

      case "password":
        copiedObject[index].password = e.currentTarget.value;
        setData(copiedObject);
        setEditPassword(e.currentTarget.value);
        break;
    }
  };

  let submitChange = (e) => {
    switch (e.currentTarget.id) {
      case "level":
        axios({
          method: "PUT",
          withCredentials: true,
          url: `http://localhost:4000/account/${level}/${editAccount}/level/adminUpdate`,
          data: {
            level: editLevel,
          },
        }).then((response) => {
          if (response.data == "Done") {
            toast.success("Sửa cấp độ thành công");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.warn("Sửa cấp độ thất bại");
          }
        });
        break;

      case "password":
        axios({
          method: "PUT",
          withCredentials: true,
          url: `http://localhost:4000/account/${level}/${editAccount}/password/adminUpdate`,
          data: {
            password: editPassword,
          },
        }).then((response) => {
          if (response.data == "Done") {
            toast.success("Sửa mật khẩu thành công");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            toast.warn("Sửa mật khẩu thất bại");
          }
        });
        break;
    }
  };

  let deleteAccountFunction = () => {
    axios({
      method: "DELETE",
      withCredentials: true,
      data: {
        email: deleteAccount,
      },
      url: `http://localhost:4000/account/${level}/adminDelete`,
    }).then((response) => {
      if (response.data == "Done") {
        toast.success("Xoá tài khoản thành công");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.warn("Xoá tài khoản thất bại");
      }
    });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <ToastContainer
        autoClose={2000}
        limit={2}
        style={{ marginTop: "30px" }}
      />
      <div className="infoBox">
        <div className="boxHeader">
          <h2>Tìm kiếm tài khoản</h2>
          <input
            className="searchInput"
            placeholder="Nhập tài khoản người dùng"
            value={searchValue}
            onChange={handleInput}
          />
        </div>

        <div className="boxBody">
          {data.map((data, index) => (
            <>
              <div
                className={
                  show.warning == true ? "warningPopup show" : "warningPopup"
                }
              >
                <div className="confirmBox">
                  <h3>
                    Bạn có chắc chắn muốn xoá tài khoản: <b>{deleteAccount}</b>?
                  </h3>
                  <p>Nhấn có để xác nhận xoá, nhấn không để huỷ</p>
                  <div className="buttonField">
                    <button
                      onClick={() => {
                        setShow((data) => ({
                          ...data,
                          warning: false,
                        }));
                      }}
                      className="btn btn-secondary"
                    >
                      Không
                    </button>
                    <button
                      onClick={() => deleteAccountFunction()}
                      className="btn btn-danger"
                    >
                      Có
                    </button>
                  </div>
                </div>
              </div>

              <div className="accountData">
                <div className="visibleData">
                  <h2>{data.email}</h2>
                  <button
                    className={
                      show.edit == index
                        ? "btn btn-secondary"
                        : "btn btn-primary"
                    }
                    onClick={() => {
                      if (show.edit == index) {
                        setShow((data) => ({
                          ...data,
                          edit: null,
                        }));
                        setEditLevel(null);
                        setEditPassword(null);
                        setEditAccount(null);
                        setInputType("password");
                      } else {
                        setShow((data) => ({
                          ...data,
                          edit: index,
                        }));
                        setEditAccount(data.email);
                      }
                    }}
                  >
                    Chỉnh sửa
                  </button>
                </div>
                <div
                  className={show.edit == index ? "visibleDropdown" : "hidden"}
                >
                  <div className="inputField">
                    <label htmlFor="level">Cấp độ</label>
                    <div className="inputWrap">
                      <input
                        onChange={(e) => handleEditData(e, index)}
                        id="level"
                        value={data.level}
                      />
                      <a
                        className="saveButton"
                        onClick={(e) => submitChange(e)}
                        id="level"
                      >
                        Lưu chỉnh sửa
                      </a>
                    </div>
                  </div>

                  <div className="inputField">
                    <label htmlFor="password">Mật khẩu</label>
                    <div className="inputWrap">
                      <input
                        onChange={(e) => handleEditData(e, index)}
                        type={inputType}
                        id="password"
                      />
                      <a
                        onClick={() => {
                          if (inputType == "password") {
                            setInputType("text");
                          } else {
                            setInputType("password");
                          }
                        }}
                      >
                        {inputType == "password" ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                      </a>
                      <a
                        className="saveButton"
                        onClick={(e) => submitChange(e)}
                        id="password"
                      >
                        Lưu chỉnh sửa
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShow((data) => ({
                        ...data,
                        warning: true,
                      }));

                      setDeleteAccount(data.email);
                    }}
                    className="btn btn-danger"
                  >
                    Xoá tài khoản
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminAccountControlPage;
