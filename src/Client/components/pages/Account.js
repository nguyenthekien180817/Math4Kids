import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../layout/Account Pages and Pop-up/accountPage.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
const { base64Converter } = require("../../util/Base64Converter");

function Account() {
  const [email, setEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [editName, setEditName] = useState(true);
  const [multiTestList, setMultiTestList] = useState([]);
  const [essayTestList, setEssayTestList] = useState([]);
  const [studentTestList, setStudentTestList] = useState([]);
  const [level, setLevel] = useState("student");
  const [show, setShow] = useState(null);
  const [showEssay, setShowEssay] = useState(null);
  const [edit, setEdit] = useState(false);

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
    setEdit(false);
    if (show == index) {
      return setShow(null);
    }
    setShow(index);
    console.log(multiTestList[index]);
  };

  let handleToggleEssay = (index) => {
    setEdit(false);
    if (showEssay == index) {
      return setShowEssay(null);
    }
    setShowEssay(index);
    console.log(essayTestList[index]);
  };

  let editMultiQuestion = async (index, childIndex, e) => {
    let copiedObject = [...multiTestList];
    console.log(index, childIndex);
    switch (e.target.name) {
      case "question":
        copiedObject[index].question[childIndex] = e.target.value;
        setMultiTestList(copiedObject);
        break;
      case "answerA":
        copiedObject[index].answerAArray[childIndex] = e.target.value;
        setMultiTestList(copiedObject);
        break;
      case "answerB":
        copiedObject[index].answerBArray[childIndex] = e.target.value;
        setMultiTestList(copiedObject);
        break;
      case "answerC":
        copiedObject[index].answerCArray[childIndex] = e.target.value;
        setMultiTestList(copiedObject);
        break;

      case "answerD":
        copiedObject[index].answerDArray[childIndex] = e.target.value;
        setMultiTestList(copiedObject);
        break;

      case "questionImage":
        copiedObject[index].imageArray.question[childIndex] =
          await base64Converter(e.target.files[0]);
        setMultiTestList(copiedObject);
        break;

      case "answerAImage":
        copiedObject[index].imageArray.answerA[childIndex] =
          await base64Converter(e.target.files[0]);
        setMultiTestList(copiedObject);
        break;

      case "answerBImage":
        copiedObject[index].imageArray.answerB[childIndex] =
          await base64Converter(e.target.files[0]);
        setMultiTestList(copiedObject);
        break;

      case "answerCImage":
        copiedObject[index].imageArray.answerC[childIndex] =
          await base64Converter(e.target.files[0]);
        setMultiTestList(copiedObject);
        break;

      case "answerDImage":
        copiedObject[index].imageArray.answerD[childIndex] =
          await base64Converter(e.target.files[0]);
        setMultiTestList(copiedObject);
        break;

      case "correctAnswer":
        copiedObject[index].correctAnswerArray[childIndex] = e.target.value;
        setMultiTestList(copiedObject);
        break;
    }
    // copiedObject[index].question[childIndex] = e.target.value;
    // setMultiTestList(copiedObject);
  };

  let editEssayQuestion = async (index, childIndex, e) => {
    let copiedObject = [...essayTestList];
    console.log(copiedObject);
    switch (e.target.name) {
      case "essayQuestion":
        copiedObject[index].questionArray[childIndex] = e.target.value;
        setEssayTestList(copiedObject);
        break;
      case "essayQImage":
        copiedObject[index].imageArray[childIndex] = await base64Converter(
          e.target.files[0]
        );
        setEssayTestList(copiedObject);
        break;
    }
  };
  //update test trac nghiem
  let updateMultiQ = (index) => {
    setEdit(false);
    axios({
      method: "PUT",
      withCredentials: true,
      url: `http://localhost:4000/multi-test/${email}/${multiTestList[index]._id}/update`,
      data: multiTestList[index],
    })
      .then((response) => {
        if (response.data == "Done") {
          toast.success("Cập nhật bài thi thành công");
        } else {
          toast.warn("Bài thi chưa được cập nhật");
        }
      })
      .catch((err) => console.log(err));
  };

  let updateEssayQ = (index) => {
    setEdit(false);
    axios({
      method: "PUT",
      withCredentials: true,
      url: `http://localhost:4000/essay-test/${email}/${essayTestList[index]._id}/update`,
      data: essayTestList[index],
    })
      .then((response) => {
        if (response.data == "Done") {
          toast.success("Cập nhật bài thi thành công");
        } else {
          toast.warn("Bài thi chưa được cập nhật");
        }
      })
      .catch((err) => console.log(err));
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
                          style={{ color: "blue", marginTop: "20px" }}
                          id={`${index}`}
                          onClick={() => handleToggle(index)}
                        >
                          Chi tiết
                        </a>
                      </tr>

                      <tr>
                        <td
                          style={{
                            padding: "0",
                          }}
                        ></td>
                        <td
                          colSpan={3}
                          style={{
                            padding: "0",
                          }}
                        >
                          <div
                            className={
                              show == index ? "accordion show" : "accordion"
                            }
                          >
                            <button
                              style={{ width: "150px" }}
                              className={
                                edit == false
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              onClick={() => {
                                if (edit == true) {
                                  setEdit(false);
                                } else {
                                  setEdit(true);
                                }
                              }}
                            >
                              {edit == true ? "Tắt chỉnh sửa" : "Chỉnh sửa"}
                            </button>
                            {test.question.map((data, childIndex) => (
                              <>
                                <div
                                  className="multiquestionCard"
                                  key={"creationfield" + childIndex}
                                >
                                  <div className="answerInputField">
                                    <input
                                      disabled={
                                        show == index && edit == true
                                          ? false
                                          : true
                                      }
                                      onChange={(e) =>
                                        editMultiQuestion(index, childIndex, e)
                                      }
                                      name="question"
                                      value={data}
                                      //Question
                                    />
                                    <label
                                      className="btn"
                                      htmlFor={`questionImage${index}${childIndex}`}
                                    >
                                      <img
                                        className="multiQImg"
                                        src={
                                          multiTestList[index].imageArray
                                            .question[childIndex]
                                        }
                                      />
                                    </label>
                                    <input
                                      disabled={
                                        show == index && edit == true
                                          ? false
                                          : true
                                      }
                                      onChange={(e) =>
                                        editMultiQuestion(index, childIndex, e)
                                      }
                                      className={index}
                                      type="file"
                                      name="questionImage"
                                      id={`questionImage${index}${childIndex}`}
                                      key={index + "questionImageCreate"}
                                    />
                                  </div>

                                  <div className="answerInputField">
                                    <input
                                      disabled={
                                        show == index && edit == true
                                          ? false
                                          : true
                                      }
                                      onChange={(e) =>
                                        editMultiQuestion(index, childIndex, e)
                                      }
                                      value={
                                        multiTestList[index].answerAArray[
                                          childIndex
                                        ]
                                      }
                                      name="answerA"
                                      //answerA
                                    />
                                    <label
                                      className="btn"
                                      htmlFor={`answerAImage${index}${childIndex}`}
                                    >
                                      <img
                                        className="multiQImg"
                                        src={
                                          multiTestList[index].imageArray
                                            .answerA[childIndex]
                                        }
                                      />
                                    </label>

                                    <input
                                      disabled={
                                        show == index && edit == true
                                          ? false
                                          : true
                                      }
                                      onChange={(e) =>
                                        editMultiQuestion(index, childIndex, e)
                                      }
                                      className={index}
                                      type="file"
                                      name="answerAImage"
                                      id={`answerAImage${index}${childIndex}`}
                                      key={index + "questionImageCreate"}
                                    />
                                  </div>

                                  <div className="answerInputField">
                                    <input
                                      disabled={
                                        show == index && edit == true
                                          ? false
                                          : true
                                      }
                                      onChange={(e) =>
                                        editMultiQuestion(index, childIndex, e)
                                      }
                                      name="answerB"
                                      value={
                                        multiTestList[index].answerBArray[
                                          childIndex
                                        ]
                                      }
                                      //B
                                    />
                                    <label
                                      className="btn"
                                      htmlFor={`answerBImage${index}${childIndex}`}
                                    >
                                      <img
                                        className="multiQImg"
                                        src={
                                          multiTestList[index].imageArray
                                            .answerB[childIndex]
                                        }
                                      />
                                    </label>

                                    <input
                                      disabled={
                                        show == index && edit == true
                                          ? false
                                          : true
                                      }
                                      onChange={(e) =>
                                        editMultiQuestion(index, childIndex, e)
                                      }
                                      className={index}
                                      type="file"
                                      name="answerBImage"
                                      id={`answerBImage${index}${childIndex}`}
                                      key={index + "questionImageCreate"}
                                    />
                                  </div>

                                  <div className="answerInputField">
                                    <input
                                      disabled={
                                        show == index && edit == true
                                          ? false
                                          : true
                                      }
                                      onChange={(e) =>
                                        editMultiQuestion(index, childIndex, e)
                                      }
                                      name="answerC"
                                      value={
                                        multiTestList[index].answerCArray[
                                          childIndex
                                        ]
                                      }
                                      //C
                                    />
                                    <label
                                      className="btn"
                                      htmlFor={`answerCImage${index}${childIndex}`}
                                    >
                                      <img
                                        className="multiQImg"
                                        src={
                                          multiTestList[index].imageArray
                                            .answerC[childIndex]
                                        }
                                      />
                                    </label>

                                    <input
                                      disabled={
                                        show == index && edit == true
                                          ? false
                                          : true
                                      }
                                      onChange={(e) =>
                                        editMultiQuestion(index, childIndex, e)
                                      }
                                      className={index}
                                      type="file"
                                      name="answerCImage"
                                      id={`answerCImage${index}${childIndex}`}
                                      key={index + "questionImageCreate"}
                                    />
                                  </div>

                                  <div className="answerInputField">
                                    <input
                                      disabled={
                                        show == index && edit == true
                                          ? false
                                          : true
                                      }
                                      onChange={(e) =>
                                        editMultiQuestion(index, childIndex, e)
                                      }
                                      name="answerD"
                                      value={
                                        multiTestList[index].answerDArray[
                                          childIndex
                                        ]
                                      }
                                      //D
                                    />
                                    <label
                                      className="btn"
                                      htmlFor={`answerDImage${index}${childIndex}`}
                                    >
                                      <img
                                        className="multiQImg"
                                        src={
                                          multiTestList[index].imageArray
                                            .answerD[childIndex]
                                        }
                                      />
                                    </label>

                                    <input
                                      disabled={
                                        show == index && edit == true
                                          ? false
                                          : true
                                      }
                                      onChange={(e) =>
                                        editMultiQuestion(index, childIndex, e)
                                      }
                                      className={index}
                                      type="file"
                                      name="answerDImage"
                                      id={`answerDImage${index}${childIndex}`}
                                      key={
                                        "questionImageCreate" +
                                        index +
                                        childIndex
                                      }
                                    />
                                  </div>

                                  <div className="answerInputField">
                                    <input
                                      disabled={
                                        show == index && edit == true
                                          ? false
                                          : true
                                      }
                                      onChange={(e) =>
                                        editMultiQuestion(index, childIndex, e)
                                      }
                                      name="correctAnswer"
                                      value={
                                        multiTestList[index].correctAnswerArray[
                                          childIndex
                                        ]
                                      }
                                    />
                                  </div>
                                </div>
                              </>
                            ))}
                            <button
                              disabled={
                                show == index && edit == true ? false : true
                              }
                              onClick={() => updateMultiQ(index)}
                              className="btn btn-primary"
                            >
                              Lưu thông tin chỉnh sửa
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            {/*====================================================================Tự luận===========================================================================*/}

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
                    <th scope="col"> </th>
                  </tr>
                </thead>
                <tbody>
                  {essayTestList.map((test, index) => (
                    <>
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <Link
                            to={`/${email}/store-finished-essay/${test._id}/detail`}
                          >
                            {test.name}
                          </Link>
                        </td>
                        <td>{test.createdAt}</td>
                        <td>{test._id}</td>
                        <td>
                          <a
                            style={{ color: "blue", marginTop: "20px" }}
                            id={`${index}`}
                            onClick={() => handleToggleEssay(index)}
                          >
                            Chi tiết
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            padding: "0",
                          }}
                        ></td>
                        <td
                          colSpan={3}
                          style={{
                            padding: "0",
                          }}
                        >
                          <div
                            className={
                              showEssay == index
                                ? "accordion show"
                                : "accordion"
                            }
                          >
                            <button
                              style={{ width: "150px" }}
                              className={
                                edit == false
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              onClick={() => {
                                if (edit == true) {
                                  setEdit(false);
                                } else {
                                  setEdit(true);
                                }
                              }}
                            >
                              {edit == true ? "Tắt chỉnh sửa" : "Chỉnh sửa"}
                            </button>
                            {test.questionArray.map((question, childIndex) => (
                              <>
                                <div className="testDataContainer">
                                  <h4>
                                    <b style={{ color: "green" }}>
                                      Câu {childIndex + 1}:
                                    </b>{" "}
                                  </h4>
                                  <textarea
                                    disabled={
                                      showEssay == index && edit == true
                                        ? false
                                        : true
                                    }
                                    name="essayQuestion"
                                    onChange={(e) =>
                                      editEssayQuestion(index, childIndex, e)
                                    }
                                    value={question}
                                    id={`essayQuestion${index}${childIndex}`}
                                    className={index}
                                  />

                                  <label
                                    className="btn"
                                    htmlFor={`essayQImage${index}${childIndex}`}
                                  >
                                    <img
                                      className={
                                        test.imageArray[childIndex] == undefined
                                          ? "hidden"
                                          : "essayImage"
                                      }
                                      src={test.imageArray[childIndex]}
                                    />
                                  </label>

                                  <input
                                    disabled={
                                      showEssay == index && edit == true
                                        ? false
                                        : true
                                    }
                                    onChange={(e) =>
                                      editEssayQuestion(index, childIndex, e)
                                    }
                                    className={index}
                                    type="file"
                                    name="essayQImage"
                                    id={`essayQImage${index}${childIndex}`}
                                    key={
                                      "questionImageCreate" + index + childIndex
                                    }
                                  />
                                </div>
                                ;
                              </>
                            ))}
                            <button
                              disabled={
                                showEssay == index && edit == true
                                  ? false
                                  : true
                              }
                              onClick={() => updateEssayQ(index)}
                              className="btn btn-primary"
                            >
                              Lưu thông tin chỉnh sửa
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
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
