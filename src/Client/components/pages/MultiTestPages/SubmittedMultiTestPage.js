import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import "../../layout/Account Pages and Pop-up/accountPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function SubmittedMultiTestPage() {
  let params = useParams();
  const [backend, setBackend] = useState([]);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(null);
  const [studentData, getStudentData] = useState([]);
  const studentEmail = useRef(null);

  //[GET] lấy thông tin giáo viên
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        setUser(response.data.email);
      })
      .catch((err) => {});
  }, []);

  // Lấy danh sách các bài thi trắc nghiệm đã nộp do GV này tạo ra
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/multi-test/${user}/store-finished-multi/${params.id}/detail`,
    })
      .then((response) => {
        setBackend(response.data);
        // console.log(response.data);
      })
      .catch((err) => {});
  }, [user]);

  //Lấy danh sách các bài nộp do GV này tạo ra từ một học sinh nhất định
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/multi-test/${user}/list-finished-multi/${studentEmail.current}`,
    })
      .then((response) => {
        getStudentData(response.data);
        console.log(response.data);
      })
      .catch((err) => {});
  }, [studentEmail.current]);

  let handleToggle = (index) => {
    console.log(backend);
    if (show == index) {
      return setShow(null);
    }
    setShow(index);
  };

  let setSrc = (i, index) => {
    switch (backend[index].answerImage[i]) {
      case "A":
        return backend[index].imageArray.answerA[i];
      case "B":
        return backend[index].imageArray.answerB[i];
      case "C":
        return backend[index].imageArray.answerC[i];
      case "D":
        return backend[index].imageArray.answerD[i];
    }
  };
  return (
    <div className="submittedTestContainer">
      {backend.length != 0 ? (
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
                            {(10 / backend[0].questionArray.length) *
                              test.score}
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
                              href={`/${test.author}/store-finished-multi/${test.test_id}/detail`}
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
                          <td>
                            {(10 / studentData[index].questionArray.length) *
                              test.score}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      ) : (
        <h1>Chưa có ai làm bài thi</h1>
      )}
    </div>
  );
}

export default SubmittedMultiTestPage;
