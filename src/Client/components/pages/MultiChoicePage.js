import React from "react";
import { useState } from "react";
import { redirect } from "react-router-dom";
function MultiChoicePage() {
  const [disable, setDisable] = useState(false);
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
        a: "getIndex()",
        b: "location()",
        c: "indexOf()",
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

  let score = 0;
  let answersArray = [];
  for (let i = 0; i < myQuestions.length; i++) {
    answersArray[i] = 0;
  }

  console.log(answersArray);

  let handleRadioSelect = (e) => {
    answersArray[e.target.name] = e.target.value;
    console.log(answersArray);
  };

  let handleSubmitScore = (e) => {
    setDisable(true);
    for (let i = 0; i < myQuestions.length; i++) {
      if (myQuestions[i].correctAnswer == answersArray[i]) {
        score++;
      }
    }
  };

  return (
    <div>
      {/* <form> */}
      {myQuestions.map((question, index) => {
        return (
          <div>
            <br />
            <p>{question.question}</p>
            {/* Question A */}
            <input
              type="radio"
              name={`${index}`}
              value={question.answers.a}
              id={question.answers.a}
              onClick={(e) => handleRadioSelect(e)}
            ></input>
            <label htmlFor={question.answers.a}>A: {question.answers.a}</label>
            <br />
            {/* Question B */}
            <input
              type="radio"
              name={`${index}`}
              value={question.answers.b}
              id={question.answers.b}
              onClick={(e) => handleRadioSelect(e)}
            ></input>
            <label htmlFor={question.answers.b}>B: {question.answers.b}</label>
            <br />
            {/* Question C */}
            <input
              type="radio"
              name={`${index}`}
              value={question.answers.c}
              id={question.answers.c}
              onClick={(e) => handleRadioSelect(e)}
            ></input>
            <label htmlFor={question.answers.c}>C: {question.answers.c}</label>
            <br />
            {/* Question D */}
            <input
              type="radio"
              name={`${index}`}
              value={question.answers.d}
              id={question.answers.d}
              onClick={(e) => handleRadioSelect(e)}
            ></input>
            <label htmlFor={question.answers.d}>D: {question.answers.d}</label>
            <br />
          </div>
        );
      })}
      {disable ? (
        <p style={{ color: "red" }}>
          You scored {score} out of {answersArray.length}
        </p>
      ) : (
        <p></p>
      )}
      <button disabled={disable} onClick={() => handleSubmitScore()}>
        Submit
      </button>
      {/* </form> */}
    </div>
  );
}

export default MultiChoicePage;
