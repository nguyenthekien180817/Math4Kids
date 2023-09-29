import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import "../layout/Account Pages and Pop-up/accountPage.css";
import axios from "axios";

function SubmittedTestPage() {
  let params = useParams();
  const [backend, setBackend] = useState([]);
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(null);

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
    <div>
      {backend.length != 0 ? (
        <div className="infoBox">
          <div className="boxHeader">
            <h2>
              Các bài nộp của bài thi: <span />
              <strong className="stroke">{backend[0].test_name}</strong>
            </h2>
          </div>
          <div className="boxBody">
            <table style={{ borderCollapse: "collapse" }} className="table">
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
                      <td>{test.student_name}</td>
                      <td>{test.student_email}</td>
                      <td>{test.createdAt}</td>
                      <td>
                        {(10 / backend[0].questionArray.length) * test.score}
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
            </table>
          </div>
        </div>
      ) : (
        <h1>Chưa có ai làm bài thi</h1>
      )}
    </div>
  );
}

export default SubmittedTestPage;
