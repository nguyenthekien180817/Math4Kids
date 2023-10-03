import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../layout/Account Pages and Pop-up/accountPage.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function Account() {
  const [email, setEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [editName, setEditName] = useState(true);
  const [multiTestList, setMultiTestList] = useState([]);
  const [essayTestList, setEssayTestList] = useState([]);
  const [studentTestList, setStudentTestList] = useState([]);
  const [level, setLevel] = useState("student");
  const [show, setShow] = useState(null);
  const [testName, setTestName] = useState("");
  let questionArray = [],
    answerAArray = [],
    answerBArray = [],
    answerCArray = [],
    answerDArray = [],
    correctAnswerArray = [];

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        setEmail(response.data.email);
        setAccountName(response.data.accountName);
        setLevel(response.data.level);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/multi-test/${email}/show-multi-test`,
    })
      .then((response) => {
        console.log(response.data);
        setMultiTestList(response.data.tests);
      })
      .catch((err) => {});

    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/essay-test/${email}/show-essay-test`,
    })
      .then((response) => {
        setEssayTestList(response.data.tests);
      })
      .catch((err) => {});
  }, [email]);

  let update = () => {
    axios({
      method: "PUT",
      url: `http://localhost:4000/account/${email}/update`,
      withCredentials: true,
      data: {
        accountName: accountName,
        email: email,
      },
    }).then((response) => {
      if (response.data == "Done") {
        toast.success("Chỉnh sửa thông tin thành công", {
          pauseOnFocusLoss: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  let handleToggle = (index) => {
    if (show == index) {
      return setShow(null);
    }
    setShow(index);
  };

  let updateQuestion = (index, childIndex, e) => {
    let copiedObject = [...multiTestList];
    copiedObject[index].question[childIndex] = e.target.value;
    setMultiTestList(copiedObject);
    console.log(multiTestList[index].question[childIndex]);
  };

  return (
    <div>
      <div className="infoBox">
        <ToastContainer
          autoClose={2000}
          limit={2}
          style={{ marginTop: "30px" }}
        />

        <div className="boxHeader">
          <h2>Thông tin tài khoản</h2>
        </div>
        <div className="boxBody">
          <label htmlFor="accountName">
            <strong>Họ và Tên: </strong>
          </label>

          <div>
            <input
              name="accountName"
              id="accountName"
              value={accountName}
              disabled={editName}
              onChange={(e) => setAccountName(e.target.value)}
            />

            {editName == true ? (
              <a onClick={() => setEditName(false)}>Edit</a>
            ) : (
              <a onClick={update} type="submit">
                Save
              </a>
            )}
          </div>
          <label htmlFor="email">
            <strong>Email: </strong>
          </label>
          <input disabled name="email" id="email" value={email} />
        </div>
      </div>

      <div className="infoBox">
        <ToastContainer
          autoClose={2000}
          limit={2}
          style={{ marginTop: "30px" }}
        />

        {level == "teacher" || level == "admin" ? (
          <div>
            <div className="boxHeader">
              <h2>Danh sách bài thi trắc nghiệm của bạn</h2>
            </div>
            <div className="boxBody">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên Test</th>
                    <th scope="col">Ngày Đăng</th>
                    <th scope="col">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {multiTestList.map((test, index) => (
                    <>
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <Link
                            to={`/${email}/store-finished-multi/${test._id}/detail`}
                          >
                            {test.name}
                          </Link>
                        </td>
                        <td>{test.createdAt}</td>
                        <td>{test._id}</td>
                        <a
                          style={{ color: "blue" }}
                          id={`${index}`}
                          onClick={() => handleToggle(index)}
                        >
                          Chi tiết
                        </a>
                      </tr>
                      <tr>
                        <td
                          colSpan={6}
                          style={{
                            padding: "0",
                          }}
                        >
                          <div
                            className={
                              show == index ? "accordion show" : "accordion"
                            }
                          >
                            {test.question.map((data, childIndex) => (
                              <input
                                onChange={(e) =>
                                  updateQuestion(index, childIndex, e)
                                }
                                value={data}
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="boxHeader">
              <h2>Danh sách bài thi tự luận của bạn</h2>
            </div>
            <div className="boxBody">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên Test</th>
                    <th scope="col">Ngày Đăng</th>
                    <th scope="col">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {essayTestList.map((test, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <Link
                          to={`/${email}/store-finished-multi/${test._id}/detail`}
                        >
                          {test.name}
                        </Link>
                      </td>
                      <td>{test.createdAt}</td>
                      <td>{test._id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <div className="boxHeader">
              <h2>Danh sách bài thi trắc nghiệm đã làm của bạn</h2>
            </div>
            <div className="boxBody" style={{ width: "100%" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên Test</th>
                    <th scope="col">Ngày Đăng</th>
                    <th scope="col">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {studentTestList.map((test, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <Link to={`/${email}/${test.name}/submited-test`}>
                          {test.name}
                        </Link>
                      </td>
                      <td>{test.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
