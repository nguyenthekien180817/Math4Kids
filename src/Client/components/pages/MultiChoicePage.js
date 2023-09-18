import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const myQuestions = [
  {
    question: "Javascript is _________ language.",
    answers: {
      a: "Programming",
      b: "Application",
      c: "None of These",
      d: "Scripting",
    },
    correctAnswer: "Programming",
  },
  {
    question:
      "Which of the following is a valid type of function javascript supports?",
    answers: {
      a: "named function",
      b: "anonymous function",
      c: "both of the above",
      d: "none of the above",
    },
    correctAnswer: "named function",
  },
  {
    question:
      "Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
    answers: {
      a: "indexOf()",
      b: "location()",
      c: "getIndex()",
      d: "getLocation()",
    },
    correctAnswer: "indexOf()",
  },
  {
    question: "Which one of the following is valid data type of JavaScript",
    answers: {
      a: "number",
      b: "void",
      c: "boolean",
      d: "a and c",
    },
    correctAnswer: "number",
  },
];
/*--------------------------- Uneeded Scrap  -----------------------------*/
function MultiChoicePage() {
  const [disable, setDisable] = useState(false);
  const [score, setScore] = useState(0);
  const [email, setEmail] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [level, setLevel] = useState("student");

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        console.log(response.data);
        setEmail(response.data.email);
        setAccountName(response.data.accountName);
        setLevel(response.data.level);
      })
      .catch((err) => {});
  }, []);
  console.log(email);
  let answersArray = [];
  for (let i = 0; i < myQuestions.length; i++) {
    answersArray[i] = 0;
  }

  let handleRadioSelect = (e) => {
    answersArray[e.target.name] = e.target.value;
  };

  let handleSubmitScore = () => {
    let questionArray = [];
    let resultArray = [];

    for (let i = 0; i < myQuestions.length; i++) {
      questionArray[i] = myQuestions[i].question;
    }

    setDisable(true);
    let count = 0;
    for (let i = 0; i < myQuestions.length; i++) {
      if (myQuestions[i].correctAnswer == answersArray[i]) {
        resultArray[i] = "true";
        count++;
      } else {
        resultArray[i] = "false";
      }
    }
    setScore(count);
    axios({
      method: "post",
      url: `http://localhost:4000/multi-test/${email}/store-finished`,
      withCredentials: true,
      data: {
        author: "user02@test",
        student_name: accountName,
        student_email: email,
        score: count,
        questionArray: questionArray,
        answersArray: answersArray,
        resultArray: resultArray,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data == "Done") {
          toast.success("Nộp bài thành công");
        } else {
          toast.error("Bạn đã làm bài thi từ trước rồi!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <ToastContainer style={{ marginTop: "40px" }} />
      {myQuestions.map((question, index) => {
        return (
          <div>
            <br />
            <p>{question.question}</p>
            {/* Question A */}
            <input
              disabled={disable}
              type="radio"
              name={`${index}`}
              value={question.answers.a}
              id={question.answers.a}
              onClick={(e) => handleRadioSelect(e)}
              key={question.answers.a}
            ></input>
            <label htmlFor={question.answers.a}>A: {question.answers.a}</label>
            <br />
            {/* Question B */}
            <input
              disabled={disable}
              type="radio"
              name={`${index}`}
              value={question.answers.b}
              id={question.answers.b}
              onClick={(e) => handleRadioSelect(e)}
              key={question.answers.b}
            ></input>
            <label htmlFor={question.answers.b}>B: {question.answers.b}</label>
            <br />
            {/* Question C */}
            <input
              disabled={disable}
              type="radio"
              name={`${index}`}
              value={question.answers.c}
              id={question.answers.c}
              onClick={(e) => handleRadioSelect(e)}
              key={question.answers.c}
            ></input>
            <label htmlFor={question.answers.c}>C: {question.answers.c}</label>
            <br />
            {/* Question D */}
            <input
              disabled={disable}
              type="radio"
              name={`${index}`}
              value={question.answers.d}
              id={question.answers.d}
              onClick={(e) => handleRadioSelect(e)}
              key={question.answers.d}
            ></input>
            <label htmlFor={question.answers.d}>D: {question.answers.d}</label>
            <br />
          </div>
        );
      })}
      {disable ? (
        <p style={{ color: "green" }}>
          You scored {score} out of {answersArray.length}
        </p>
      ) : (
        <p></p>
      )}
      <button disabled={disable} onClick={handleSubmitScore}>
        Submit
      </button>
      {/* </form> */}
    </div>
  );
}

export default MultiChoicePage;
