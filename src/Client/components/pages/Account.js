import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../layout/Account Pages and Pop-up/accountPage.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { base64Converter } from "../../util/Base64Converter";

function Account() {
  const [email, setEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [editName, setEditName] = useState(true);
  const [multiTestList, setMultiTestList] = useState([]);
  const [essayTestList, setEssayTestList] = useState([]);
  const [studentMultiTestList, setStudentMultiTestList] = useState([]);
  const [studentEssayTestList, setStudentEssayTestList] = useState([]);
  const [level, setLevel] = useState("student");
  const [editPassword, setEditPassword] = useState({
    edit: false,
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [show, setShow] = useState({
    essay: null,
    multi: null,
    warning: false,
  });
  const [edit, setEdit] = useState(false);
  const [deleteData, setDeleteData] = useState({
    name: "",
    id: "",
    type: "",
  });

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

  //[GET] lấy về các bài thi đã được nộp
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/multi-test/${email}/show-multi-test`,
    })
      .then((response) => {
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

    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/essay-test/${email}/show-student-finished-essay`,
    })
      .then((response) => {
        setStudentEssayTestList(response.data);
      })
      .catch((err) => {});

    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/multi-test/${email}/show-student-finished-multi`,
    })
      .then((response) => {
        setStudentMultiTestList(response.data);
        console.log(response.data);
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

  let handleToggle = (e, index) => {
    console.log(e.currentTarget.name);
    switch (e.currentTarget.name) {
      case "essay":
        setEdit(false);
        if (show.essay == index) {
          return setShow((data) => ({
            ...data,
            essay: null,
          }));
        }
        setShow((data) => ({
          ...data,
          essay: index,
          multi: null,
        }));
        break;

      case "multi":
        setEdit(false);
        if (show.multi == index) {
          return setShow((data) => ({
            ...data,
            multi: null,
          }));
        }
        setShow((data) => ({
          ...data,
          multi: index,
          essay: null,
        }));
        break;
    }
  };

  let setSrc = (i, index) => {
    switch (studentMultiTestList[index].answerImage[i]) {
      case "A":
        return studentMultiTestList[index].imageArray.answerA[i];
      case "B":
        return studentMultiTestList[index].imageArray.answerB[i];
      case "C":
        return studentMultiTestList[index].imageArray.answerC[i];
      case "D":
        return studentMultiTestList[index].imageArray.answerD[i];
    }
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
        console.log(response.data);
        if (response.data == "Done") {
          toast.success("Cập nhật bài thi thành công");
        } else {
          toast.warn("Bài thi chưa được cập nhật");
        }
      })
      .catch((err) => console.log(err));
  };

  let deleteTest = () => {
    axios({
      method: "DELETE",
      withCredentials: true,
      url: `http://localhost:4000/${deleteData.type}/${level}/${deleteData.id}/delete`,
    }).then((response) => {
      if (response.data == "Done") {
        toast.success("Xoá bài thi thành công");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.warn("Bạn không có quyền xoá bài thi");
      }
    });
  };

  let updatePassword = () => {
    if (editPassword.repeatPassword != editPassword.newPassword) {
      toast.warn("Mật khẩu nhập lại không đúng");
    } else {
      axios({
        method: "PUT",
        withCredentials: true,
        url: `http://localhost:4000/account//${email}/update-password`,
        data: {
          oldPassword: String(editPassword.oldPassword),
          newPassword: editPassword.newPassword,
        },
      }).then((response) => {
        console.log(response.data);
        if (response.data == "Done") {
          toast.success("Đổi mật khẩu thành công");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.warn("Mật khẩu không đúng");
        }
      });
    }
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
          <a
            onClick={() => {
              if (editPassword.edit == false) {
                setEditPassword((data) => ({
                  ...data,
                  edit: true,
                }));
              } else {
                setEditPassword((data) => ({
                  ...data,
                  edit: false,
                }));
              }
            }}
            style={{ marginTop: "10px", color: "blue" }}
          >
            Đổi Mật Khẩu
          </a>

          <label
            className={editPassword.edit == false ? "hidden" : ""}
            htmlFor="oldPassword"
          >
            <strong>Mật khẩu cũ: </strong>
          </label>
          <input
            className={editPassword.edit == false ? "hidden" : ""}
            id="oldPassword"
            onChange={(e) => {
              setEditPassword((data) => ({
                ...data,
                oldPassword: e.target.value,
              }));
            }}
          />
          <label
            className={editPassword.edit == false ? "hidden" : ""}
            htmlFor="newPassword"
          >
            <strong>Mật khẩu Mới: </strong>
          </label>
          <input
            className={editPassword.edit == false ? "hidden" : ""}
            id="newPassword"
            onChange={(e) => {
              setEditPassword((data) => ({
                ...data,
                newPassword: e.target.value,
              }));
            }}
          />

          <label
            className={editPassword.edit == false ? "hidden" : ""}
            htmlFor="repeatPassword"
          >
            <strong>Nhập lại mật khẩu: </strong>
          </label>

          <input
            className={editPassword.edit == false ? "hidden" : ""}
            id="repeatPassword"
            onChange={(e) => {
              setEditPassword((data) => ({
                ...data,
                repeatPassword: e.target.value,
              }));
            }}
          />
          <button
            onClick={() => updatePassword()}
            style={{ width: "fit-content", marginTop: "10px" }}
            className={
              editPassword.edit == false ? "hidden" : "btn btn-primary"
            }
          >
            Lưu mật khẩu
          </button>
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
                          name="multi"
                          style={{ color: "blue", marginTop: "20px" }}
                          id={`${index}`}
                          onClick={(e) => handleToggle(e, index)}
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
                              show.multi == index
                                ? "accordion show"
                                : "accordion"
                            }
                          >
                            <div className="buttonField">
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
                              <button
                                onClick={() => {
                                  setShow((data) => ({
                                    ...data,
                                    warning: true,
                                  }));

                                  setDeleteData((data) => ({
                                    ...data,
                                    name: test.name,
                                    id: test._id,
                                    type: "multi-test",
                                  }));
                                }}
                                style={{ width: "150px", float: "left" }}
                                className="btn btn-danger"
                              >
                                Xoá bài thi
                              </button>
                            </div>

                            {test.question.map((data, childIndex) => (
                              <>
                                <div
                                  className="multiquestionCard"
                                  key={"creationfield" + childIndex}
                                >
                                  <h4>Câu số {childIndex + 1}</h4>
                                  <div className="answerInputField">
                                    <input
                                      disabled={
                                        show.multi == index && edit == true
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
                                        show.multi == index && edit == true
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
                                        show.multi == index && edit == true
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
                                        show.multi == index && edit == true
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
                                        show.multi == index && edit == true
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
                                        show.multi == index && edit == true
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
                                        show.multi == index && edit == true
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
                                        show.multi == index && edit == true
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
                                        show.multi == index && edit == true
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
                                        show.multi == index && edit == true
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
                                        show.multi == index && edit == true
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
                                show.multi == index && edit == true
                                  ? false
                                  : true
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
                            name="essay"
                            style={{ color: "blue", marginTop: "20px" }}
                            id={`${index}`}
                            onClick={(e) => handleToggle(e, index)}
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
                              show.essay == index
                                ? "accordion show"
                                : "accordion"
                            }
                          >
                            <div className="buttonField">
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

                              <button
                                onClick={() => {
                                  setShow((data) => ({
                                    ...data,
                                    warning: true,
                                  }));

                                  setDeleteData((data) => ({
                                    ...data,
                                    name: test.name,
                                    id: test._id,
                                    type: "essay-test",
                                  }));
                                }}
                                style={{ width: "150px", float: "left" }}
                                className="btn btn-danger"
                              >
                                Xoá bài thi
                              </button>
                            </div>

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
                                      show.essay == index && edit == true
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
                                      show.essay == index && edit == true
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
                                show.essay == index && edit == true
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
          <>
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
                    {studentMultiTestList.length > 0 &&
                      studentMultiTestList.map((test, index) => (
                        <>
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <p>{test.test_name}</p>
                            </td>
                            <td>{test.createdAt}</td>
                            <td>{test.author}</td>
                            <td>
                              <a
                                name="multi"
                                style={{ color: "blue", marginTop: "20px" }}
                                id={`${index}`}
                                onClick={(e) => handleToggle(e, index)}
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
                                  show.multi == index
                                    ? "accordion show"
                                    : "accordion"
                                }
                              >
                                {test.answersArray.map((answer, i) => (
                                  <div className="detailWrapper">
                                    {test.resultArray[i] == "true" ? (
                                      <FontAwesomeIcon
                                        style={{
                                          fontSize: "73px",
                                          color: "green",
                                          paddingRight: "16px",
                                          paddingLeft: "16px",
                                        }}
                                        icon={faCheck}
                                      />
                                    ) : (
                                      <FontAwesomeIcon
                                        style={{
                                          fontSize: "80px",
                                          color: "red",
                                          paddingRight: "20px",
                                          paddingLeft: "16px",
                                        }}
                                        icon={faXmark}
                                      />
                                    )}

                                    <h5 className="textAnswerWrapper">
                                      Câu hỏi {i + 1}: {test.questionArray[i]}{" "}
                                      <img src={test.imageArray.question[1]} />
                                      <br />
                                      Câu trả lời {i + 1}: {answer}
                                      <img src={setSrc(i, index)} />
                                    </h5>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="boxHeader">
                <h2>Danh sách bài thi tự Luận đã làm của bạn</h2>
              </div>
              <div className="boxBody" style={{ width: "100%" }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Tên Test</th>
                      <th scope="col">Ngày Đăng</th>
                      <th scope="col">Giáo viên</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentEssayTestList.length > 0 &&
                      studentEssayTestList.map((test, index) => (
                        <>
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <p>{test.test_name}</p>
                            </td>
                            <td>{test.createdAt}</td>
                            <td>{test.author}</td>
                            <td>
                              <a
                                name="essay"
                                style={{ color: "blue", marginTop: "20px" }}
                                id={`${index}`}
                                onClick={(e) => handleToggle(e, index)}
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
                                  show.essay == index
                                    ? "accordion show"
                                    : "accordion"
                                }
                              >
                                {test.answersArray.map((answer, i) => (
                                  <div className="detailWrapper">
                                    <h5 className="textAnswerWrapper">
                                      Câu hỏi {i + 1}: {test.questionArray[i]}{" "}
                                      <img src={test.questionImages[i]} />
                                      <br />
                                      Câu trả lời {i + 1}: {answer}
                                      <img src={test.answerImages[i]} />
                                      <label htmlFor={`scoreInput${i}`}>
                                        Điểm:{" "}
                                        <input
                                          disabled
                                          name="score"
                                          id={`scoreInput${i}`}
                                          type="text"
                                          value={
                                            test.scoreArray[i] == null ||
                                            test.scoreArray[i] ==
                                              "Chưa được chấm điểm"
                                              ? "Chưa được chấm điểm"
                                              : test.scoreArray[i]
                                          }
                                        />
                                      </label>
                                      <label htmlFor={`noteInput${i}`}>
                                        Nhận xét:{" "}
                                        <input
                                          disabled
                                          name="note"
                                          id={`noteInput${i}`}
                                          type="text"
                                          value={
                                            test.noteArray[i] == null
                                              ? "Chưa có nhận xét"
                                              : test.noteArray[i]
                                          }
                                        />
                                      </label>
                                    </h5>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className={show.warning == true ? "warningPopup show" : "warningPopup"}
      >
        <div className="confirmBox">
          <h3>
            Bạn có chắc chắn muốn xoá bài thi: <b>{deleteData.name}</b>?
          </h3>
          <p>Nhấn có để xác nhận xoá, nhấn không để huỷ</p>
          <div className="buttonField">
            <button
              onClick={() => {
                setShow((data) => ({
                  ...data,
                  warning: false,
                }));
                setDeleteData({
                  name: "",
                  id: "",
                  type: "",
                });
              }}
              className="btn btn-secondary"
            >
              Không
            </button>
            <button onClick={() => deleteTest()} className="btn btn-danger">
              Có
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
