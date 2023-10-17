import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
function DetailedMultiChoicePage() {
  let answersArray = [];
  let answerImage = [];
  const [disable, setDisable] = useState(false);
  const [email, setEmail] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [myQuestions, setMyQuestions] = useState(null);
  const params = useParams();
  console.log(params.slug);
  let showScore = useRef(0);

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
    if (e.target.value == "") {
      answersArray[e.target.name] = String(e.target.id).slice(0, 1);
    } else {
      answersArray[e.target.name] = e.target.value;
    }
    answerImage[e.target.name] = String(e.target.id).slice(0, 1);
    console.log(answerImage);
  };

  let handleSubmitScore = () => {
    let resultArray = [];
    setDisable(true);
    let count = 0;
    for (let i = 0; i < myQuestions.question.length; i++) {
      if (
        myQuestions.correctAnswerArray[i].toLowerCase() ==
        answersArray[i].toLowerCase()
      ) {
        resultArray[i] = "true";
        count++;
        showScore.current = count;
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
        test_name: myQuestions.name,
        questionArray: myQuestions.question,
        answersArray: answersArray,
        resultArray: resultArray,
        test_id: myQuestions._id,
        imageArray: myQuestions.imageArray,
        answerImage: answerImage,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.message == "Done") {
          toast.success("Nộp bài thành công");
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
                  Câu hỏi {index + 1}: {question}{" "}
                  <img
                    className="multiQImg"
                    src={myQuestions.imageArray.question[index]}
                  />
                </p>

                {/* Question A */}
                <input
                  disabled={disable}
                  type="radio"
                  name={`${index}`}
                  value={myQuestions.answerAArray[index]}
                  id={"A" + index}
                  onClick={(e) => handleRadioSelect(e)}
                  key={index + "questionA"}
                ></input>
                <label htmlFor={"A" + index}>
                  A:{" "}
                  {myQuestions.answerAArray[index].toLowerCase() == "a"
                    ? ""
                    : myQuestions.answerAArray[index]}
                </label>
                <img
                  className="multiQImg"
                  src={myQuestions.imageArray.answerA[index]}
                />
                <br />
                {/* Question B */}
                <input
                  disabled={disable}
                  type="radio"
                  name={`${index}`}
                  value={myQuestions.answerBArray[index]}
                  id={"B" + index}
                  onClick={(e) => handleRadioSelect(e)}
                  key={index + "questionB"}
                ></input>
                <label htmlFor={"B" + index}>
                  B:{" "}
                  {myQuestions.answerBArray[index].toLowerCase() == "b"
                    ? ""
                    : myQuestions.answerBArray[index]}
                  <img
                    className="multiQImg"
                    src={myQuestions.imageArray.answerB[index]}
                  />
                </label>
                <br />
                {/* Question C */}
                <input
                  disabled={disable}
                  type="radio"
                  name={`${index}`}
                  value={myQuestions.answerCArray[index]}
                  id={"C" + index}
                  onClick={(e) => handleRadioSelect(e)}
                  key={index + "questionC"}
                ></input>
                <label htmlFor={"C" + index}>
                  C:{" "}
                  {myQuestions.answerCArray[index].toLowerCase() == "c"
                    ? ""
                    : myQuestions.answerCArray[index]}
                  <img
                    className="multiQImg"
                    src={myQuestions.imageArray.answerC[index]}
                  />
                </label>
                <br />
                {/* Question D */}
                <input
                  disabled={disable}
                  type="radio"
                  name={`${index}`}
                  value={myQuestions.answerDArray[index]}
                  id={"D" + index}
                  onClick={(e) => handleRadioSelect(e)}
                  key={index + "questionD"}
                ></input>
                <label htmlFor={"D" + index}>
                  D:{" "}
                  {myQuestions.answerDArray[index].toLowerCase() == "d"
                    ? ""
                    : myQuestions.answerDArray[index]}
                  <img
                    className="multiQImg"
                    src={myQuestions.imageArray.answerD[index]}
                  />
                </label>
                <br />
              </div>
            );
          })}
          {disable ? (
            <p style={{ color: "green" }}>
              Bạn làm đúng {showScore.current} trên tổng số{" "}
              {myQuestions.question.length} câu hỏi
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
