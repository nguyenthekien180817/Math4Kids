import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubmittedEssayTestPage() {
  const [account, setAccount] = useState([]);
  const [backend, setBackend] = useState([]);
  const [studentData, getStudentData] = useState([]);
  const [show, setShow] = useState(null);
  const studentEmail = useRef(null);
  const [edit, setEdit] = useState(false);
  let params = useParams();

  //[GET] lấy thông tin của giáo viên
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        setAccount(response.data.email);
      })
      .catch((err) => {});
  }, []);

  //[GET] lấy các bài thi đã được nộp của giáo viên này
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,

      url: `http://localhost:4000/essay-test/${account}/store-finished-essay/${params.id}/detail`,
    })
      .then((response) => {
        setBackend(response.data);
        console.log(response.data);
      })
      .catch((err) => {});
  }, [account]);

  //[GET] lấy danh sách bài thi của học sinh nhất định do GV này tạo ra
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/essay-test/${account}/list-finished-essay/${studentEmail.current}`,
    })
      .then((response) => {
        getStudentData(response.data);
        console.log(response.data);
      })
      .catch((err) => {});
  }, [studentEmail.current]);

  let handleToggle = (index) => {
    setEdit(false);
    console.log(backend);
    if (show == index) {
      return setShow(null);
    }
    setShow(index);
  };

  let handleInput = (fatherIndex, i, e) => {
    let score = 0;
    let copiedObject = [...backend];
    switch (e.currentTarget.name) {
      case "score":
        copiedObject[fatherIndex].scoreArray[i] = e.currentTarget.value;
        setBackend(copiedObject);
        console.log(backend[fatherIndex].totalScore);
        console.log(backend[fatherIndex].scoreArray);
        break;

      case "note":
        copiedObject[fatherIndex].noteArray[i] = e.currentTarget.value;
        setBackend(copiedObject);
        console.log(backend[fatherIndex].noteArray[i]);
        break;
    }
  };

  let update = (fatherIndex) => {
    let score = 0;
    for (
      let index = 0;
      index < backend[fatherIndex].scoreArray.length;
      index++
    ) {
      if (
        backend[fatherIndex].scoreArray[index] ==
        Number(backend[fatherIndex].scoreArray[index])
      ) {
        score += Number(backend[fatherIndex].scoreArray[index]);
      }
      backend[fatherIndex].totalScore = score;
    }
    setEdit(false);
    axios({
      method: "PUT",
      withCredentials: true,
      url: `http://localhost:4000/essay-test/${account}/list-finished-essay/${backend[fatherIndex]._id}/update`,
      data: backend[fatherIndex],
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
      <ToastContainer style={{ marginTop: "40px" }} />
      {backend.length != 0 ? (
        <div className="submittedTestContainer">
          <div className="infoBox">
            <div className="boxHeader">
              {studentEmail.current == null ? (
                <>
                  <h2>
                    Các bài nộp của bài thi: <span />
                    <strong className="stroke">{backend[0].test_name}</strong>
                  </h2>
                </>
              ) : (
                <>
                  <h2>Bài nộp của học sinh {studentEmail.current}</h2>
                  <Link
                    onClick={() => {
                      studentEmail.current = null;
                      console.log(studentEmail.current);
                    }}
                  >
                    Quay lại
                  </Link>
                </>
              )}
            </div>
            <div className="boxBody">
              <table style={{ borderCollapse: "collapse" }} className="table">
                {studentEmail.current == null ? (
                  <>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên học sinh</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ngày Nộp</th>
                        <th scope="col">Số điểm</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {backend.map((test, index) => (
                        <>
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <Link
                                onClick={() => {
                                  studentEmail.current = test.student_email;
                                  console.log(studentEmail);
                                }}
                              >
                                {test.student_name}
                              </Link>
                            </td>
                            <td>{test.student_email}</td>
                            <td>{test.createdAt}</td>
                            <td>
                              {test.totalScore == null ? 0 : test.totalScore}
                            </td>
                            <td>
                              <a
                                style={{ color: "blue" }}
                                id={`${index}`}
                                onClick={() => handleToggle(index)}
                              >
                                Chi tiết
                              </a>
                            </td>
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
                                          disabled={
                                            show == index && edit == true
                                              ? false
                                              : true
                                          }
                                          name="score"
                                          onChange={(e) =>
                                            handleInput(index, i, e)
                                          }
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
                                          disabled={
                                            show == index && edit == true
                                              ? false
                                              : true
                                          }
                                          name="note"
                                          onChange={(e) =>
                                            handleInput(index, i, e)
                                          }
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
                                <button
                                  disabled={
                                    show == index && edit == true ? false : true
                                  }
                                  onClick={() => update(index)}
                                  className="btn btn-primary"
                                >
                                  Lưu chỉnh sửa
                                </button>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </>
                ) : (
                  <>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Bài Kiểm Tra</th>
                        <th scope="col">Giáo Viên</th>
                        <th scope="col">Ngày Nộp</th>
                        <th scope="col">Số điểm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.map((test, index) => (
                        <>
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <a
                                href={`/${test.author}/store-finished-essay/${test.test_id}/detail`}
                              >
                                <button
                                  class="btn btn-link"
                                  onClick={() => {
                                    studentEmail.current = null;
                                    console.log(studentEmail.current);
                                  }}
                                >
                                  {test.test_name}
                                </button>
                              </a>
                            </td>
                            <td>{test.author}</td>
                            <td>{test.createdAt}</td>
                            <td>{test.totalScore}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </>
                )}
              </table>
            </div>
          </div>
        </div>
      ) : (
        <h1>Chưa có ai nộp bài thi</h1>
      )}
    </div>
  );
}

export default SubmittedEssayTestPage;
