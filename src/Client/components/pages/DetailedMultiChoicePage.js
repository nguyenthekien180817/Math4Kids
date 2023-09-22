import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
function DetailedMultiChoicePage() {
  let answersArray = [];
  const [disable, setDisable] = useState(false);
  const [score, setScore] = useState(0);
  const [email, setEmail] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [myQuestions, setMyQuestions] = useState(null);
  const params = useParams();
  console.log(params.slug);

  // [GET] test details ------------------------------------------------
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/multi-test/show-detail/${params.slug}`,
    })
      .then((response) => {
        console.log(response);
        setMyQuestions(response.data.tests);
      })
      .catch((err) => {});
  }, []);

  // [GET] user detail ---------------------------------------------------
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        setEmail(response.data.email);
        setAccountName(response.data.accountName);
      })
      .catch((err) => {});
  }, []);

  let handleRadioSelect = (e) => {
    answersArray[e.target.name] = e.target.value;
  };

  let handleSubmitScore = () => {
    let resultArray = [];
    setDisable(true);
    let count = 0;
    for (let i = 0; i < myQuestions.question.length; i++) {
      if (myQuestions.correctAnswerArray[i] == answersArray[i]) {
        resultArray[i] = "true";
        count++;
      } else {
        resultArray[i] = "false";
      }
    }
    axios({
      method: "post",
      url: `http://localhost:4000/multi-test/${email}/store-finished-multi`,
      withCredentials: true,
      data: {
        author: myQuestions.author,
        student_name: accountName,
        student_email: email,
        score: count,
        questionArray: myQuestions.question,
        answersArray: answersArray,
        resultArray: resultArray,
        test_id: myQuestions._id,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.message == "Done") {
          toast.success("Nộp bài thành công");
          let cnt = 0;
          for (let i = 0; i < response.data.detail; i++) {
            if (response.data.detail[i] == "true") {
              cnt++;
              setScore(cnt);
            }
          }
          console.log(score);
        } else {
          toast.warning("Bạn đã làm bài thi từ trước rồi!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {myQuestions != null ? <h1>{myQuestions.name}</h1> : <p></p>}
      <ToastContainer style={{ marginTop: "40px" }} />
      {myQuestions == null ? (
        <p></p>
      ) : (
        <div>
          {myQuestions.question.map((question, index) => {
            return (
              <div style={{ marginLeft: "40px" }}>
                <br />
                <p>
                  Câu hỏi {index + 1}: {question}
                </p>
                {/* Question A */}
                <input
                  disabled={disable}
                  type="radio"
                  name={`${index}`}
                  value={myQuestions.answerAArray[index]}
                  id={myQuestions.answerAArray[index] + "A" + index}
                  onClick={(e) => handleRadioSelect(e)}
                  key={index + "questionA"}
                ></input>
                <label htmlFor={myQuestions.answerAArray[index] + "A" + index}>
                  A: {myQuestions.answerAArray[index]}
                </label>
                <br />
                {/* Question B */}
                <input
                  disabled={disable}
                  type="radio"
                  name={`${index}`}
                  value={myQuestions.answerBArray[index]}
                  id={myQuestions.answerBArray[index] + "B" + index}
                  onClick={(e) => handleRadioSelect(e)}
                  key={index + "questionB"}
                ></input>
                <label htmlFor={myQuestions.answerBArray[index] + "B" + index}>
                  B: {myQuestions.answerBArray[index]}
                </label>
                <br />
                {/* Question C */}
                <input
                  disabled={disable}
                  type="radio"
                  name={`${index}`}
                  value={myQuestions.answerCArray[index]}
                  id={myQuestions.answerCArray[index] + "C" + index}
                  onClick={(e) => handleRadioSelect(e)}
                  key={index + "questionC"}
                ></input>
                <label htmlFor={myQuestions.answerCArray[index] + "C" + index}>
                  C: {myQuestions.answerCArray[index]}
                </label>
                <br />
                {/* Question D */}
                <input
                  disabled={disable}
                  type="radio"
                  name={`${index}`}
                  value={myQuestions.answerDArray[index]}
                  id={myQuestions.answerDArray[index] + "D" + index}
                  onClick={(e) => handleRadioSelect(e)}
                  key={index + "questionD"}
                ></input>
                <label htmlFor={myQuestions.answerDArray[index] + "D" + index}>
                  D: {myQuestions.answerDArray[index]}
                </label>
                <br />
              </div>
            );
          })}
          {disable ? (
            <p style={{ color: "green" }}>
              You scored {score} out of {myQuestions.question.length}
            </p>
          ) : (
            <p></p>
          )}
          {myQuestions == null || myQuestions == undefined ? (
            <p>
              <Link to={`http://localhost:3000/trac-nghiem`}>
                Bài thi bị trống hoặc sai mã đề. Nhấn vào đây để quay lại trang
                trước.
              </Link>
            </p>
          ) : (
            <button disabled={disable} onClick={handleSubmitScore}>
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DetailedMultiChoicePage;
